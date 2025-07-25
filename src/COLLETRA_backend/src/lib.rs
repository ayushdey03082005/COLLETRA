// --- DEPENDENCIES ---
// Add these to your Cargo.toml
// candid = "0.10.15"
// ic-cdk = "0.18.5"
// ic-cdk-macros = "0.18.5"
// ic-stable-structures = "0.7.0"
// serde = "1.0"
// serde_json = "1.0"
// num-traits = "0.2"

use candid::{CandidType, Principal, Nat};
use ic_cdk::{query, update, api::{caller, time}};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, BoundedStorable, Storable, storable::Bound};
use std::borrow::Cow;
use std::cell::RefCell;
use serde::{Deserialize, Serialize};
use num_traits::ToPrimitive;

// --- TYPE DEFINITIONS ---

type Memory = VirtualMemory<DefaultMemoryImpl>;

#[derive(CandidType, Deserialize, Serialize, Clone, Copy, PartialEq, Eq, Debug)]
enum Role {
    Borrower,
    Lender,
    Admin,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Copy, PartialEq, Eq, Debug)]
enum LoanStatus {
    Pending,   // Waiting for a lender
    Active,    // Funded and ongoing
    Repaid,    // Successfully paid off
    Defaulted, // Not paid in time, collateral liquidated
}

#[derive(CandidType, Deserialize, Serialize, Clone, Copy, PartialEq, Eq, Debug)]
enum TransactionType {
    LoanRequested,
    LoanFunded,
    RepaymentMade,
    CollateralLiquidated,
    InterestWithdrawn,
}

// --- DATA STRUCTURES ---

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
struct User {
    principal: Principal,
    roles: Vec<Role>,
    transaction_history: Vec<u64>, // Vec of transaction IDs
    active_loan_ids: Vec<u64>, // Loans they are borrowing or lending
    created_at: u64,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
struct Loan {
    id: u64,
    borrower: Principal,
    lender: Option<Principal>,
    amount: Nat, // Loan amount requested
    collateral_value: Nat, // Value at time of creation, updated periodically
    status: LoanStatus,
    created_at: u64, // Timestamp of loan request
    funded_at: Option<u64>,
    due_date: u64,
    repayment_history: Vec<Repayment>,
    // This would be fetched from an oracle or set based on collateral type
    risk_factor: f64, 
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
struct Repayment {
    amount: Nat,
    timestamp: u64,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
struct Transaction {
    id: u64,
    transaction_type: TransactionType,
    involved_principals: Vec<Principal>,
    amount: Nat,
    timestamp: u64,
    details: String,
}

// --- STABLE STORAGE IMPLEMENTATION (Corrected for ic-stable-structures v0.7.0) ---

impl Storable for User {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_json::to_vec(self).unwrap())
    }
    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_json::from_slice(bytes.as_ref()).unwrap()
    }
}

impl BoundedStorable for User {
    const MAX_SIZE: u32 = 2048;
    const IS_FIXED_SIZE: bool = false;
}

impl Storable for Loan {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_json::to_vec(self).unwrap())
    }
    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_json::from_slice(bytes.as_ref()).unwrap()
    }
}

impl BoundedStorable for Loan {
    const MAX_SIZE: u32 = 2048;
    const IS_FIXED_SIZE: bool = false;
}

impl Storable for Transaction {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_json::to_vec(self).unwrap())
    }
    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_json::from_slice(bytes.as_ref()).unwrap()
    }
}

impl BoundedStorable for Transaction {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}


// --- CANISTER STATE ---
thread_local! {
    // Memory manager for stable storage
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = 
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    // Stable storage for users, loans, and transactions
    static USERS: RefCell<StableBTreeMap<Principal, User, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))))
    );

    static LOANS: RefCell<StableBTreeMap<u64, Loan, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1))))
    );
    
    static TRANSACTIONS: RefCell<StableBTreeMap<u64, Transaction, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2))))
    );

    // Counters for unique IDs
    static NEXT_LOAN_ID: RefCell<u64> = RefCell::new(0);
    static NEXT_TRANSACTION_ID: RefCell<u64> = RefCell::new(0);
}


// --- MODULE 1: USER AUTH & MANAGEMENT ---

#[update]
fn register_user(initial_role: Role) -> Result<User, String> {
    // --- WALLET INTEGRATION POINT ---
    // The `caller()` function securely gets the Principal of the user who called this method.
    // This Principal is their unique, cryptographic ID from Internet Identity or Plug Wallet.
    let principal_id = caller();

    // Check if user already exists
    if USERS.with(|users| users.borrow().contains_key(&principal_id)) {
        return Err("User already exists.".to_string());
    }

    let new_user = User {
        principal: principal_id,
        roles: vec![initial_role],
        transaction_history: Vec::new(),
        active_loan_ids: Vec::new(),
        created_at: time(),
    };

    USERS.with(|users| users.borrow_mut().insert(principal_id, new_user.clone()));
    Ok(new_user)
}

#[query]
fn get_user() -> Result<User, String> {
    let principal_id = caller();
    USERS.with(|users| {
        match users.borrow().get(&principal_id) {
            Some(user) => Ok(user.clone()),
            None => Err("User not found.".to_string()),
        }
    })
}

// --- MODULE 2 & 3: LOAN HEALTH & REPAYMENT LOGIC ---

// This is a helper function, not exposed directly via Candid.
fn calculate_loan_health(loan: &Loan) -> f64 {
    // In a real scenario, this would call an oracle to get the current collateral value.
    // For now, we use the stored value.
    let collateral_value = loan.collateral_value.0.to_f64().unwrap_or(0.0);
    let loan_amount = loan.amount.0.to_f64().unwrap_or(1.0); // Avoid division by zero

    // Calculate overdue penalty based on due_date and current time
    let now = time();
    let overdue_penalty = if now > loan.due_date {
        // Example: 0.1 penalty for each day overdue
        let days_overdue = (now - loan.due_date) / (24 * 60 * 60 * 1_000_000_000);
        (days_overdue as f64) * 0.1
    } else {
        0.0
    };

    (collateral_value / loan_amount) * loan.risk_factor - overdue_penalty
}

#[query]
fn get_loan_health(loan_id: u64) -> Result<f64, String> {
    LOANS.with(|loans| {
        match loans.borrow().get(&loan_id) {
            Some(loan) => Ok(calculate_loan_health(&loan)),
            None => Err("Loan not found.".to_string()),
        }
    })
}


// --- MODULE 4: SMART CONTRACT LOGIC ---

#[update]
fn create_loan_request(amount: Nat, collateral_value: Nat, duration_days: u64) -> Result<Loan, String> {
    let borrower_principal = caller();
    let _user = get_user()?; // Ensures the user is registered

    let loan_id = NEXT_LOAN_ID.with(|id| {
        let next_id = *id.borrow();
        *id.borrow_mut() += 1;
        next_id
    });

    let new_loan = Loan {
        id: loan_id,
        borrower: borrower_principal,
        lender: None,
        amount,
        collateral_value,
        status: LoanStatus::Pending,
        created_at: time(),
        funded_at: None,
        due_date: time() + (duration_days * 24 * 60 * 60 * 1_000_000_000),
        repayment_history: Vec::new(),
        risk_factor: 1.2, // Example risk factor
    };

    LOANS.with(|loans| loans.borrow_mut().insert(loan_id, new_loan.clone()));
    
    // Log this transaction
    log_transaction(
        TransactionType::LoanRequested, 
        vec![borrower_principal], 
        new_loan.amount.clone(), 
        format!("Loan request #{} created.", loan_id)
    );

    Ok(new_loan)
}

#[update]
fn fund_loan(loan_id: u64) -> Result<Loan, String> {
    let lender_principal = caller();
    
    let result = LOANS.with(|loans| {
        let mut loans_mut = loans.borrow_mut();
        let mut loan = match loans_mut.get(&loan_id) {
            Some(l) => l.clone(),
            None => return Err("Loan not found.".to_string()),
        };

        // --- PERMISSION CHECKS ---
        if loan.status != LoanStatus::Pending {
            return Err("Loan is not available for funding.".to_string());
        }
        if loan.borrower == lender_principal {
            return Err("You cannot fund your own loan.".to_string());
        }

        // TODO: Add logic to transfer funds from lender to borrower
        // This would involve interacting with an ICRC-1 token canister.

        loan.lender = Some(lender_principal);
        loan.status = LoanStatus::Active;
        loan.funded_at = Some(time());

        loans_mut.insert(loan_id, loan.clone());
        
        log_transaction(
            TransactionType::LoanFunded, 
            vec![lender_principal, loan.borrower], 
            loan.amount.clone(), 
            format!("Loan #{} funded by {}.", loan_id, lender_principal)
        );

        Ok(loan)
    });
    result
}

// --- MODULE 5: ALERT & NOTIFICATION SYSTEM ---

#[query]
fn check_loans_for_alerts() -> Vec<(u64, String)> {
    // This function would be called periodically by an external service or a canister timer.
    let mut alerts = Vec::new();
    let now = time();

    LOANS.with(|loans| {
        for (id, loan) in loans.borrow().iter() {
            let health = calculate_loan_health(&loan);
            if health < 1.0 {
                alerts.push((id, format!("Loan #{} is at risk of liquidation!", id)));
            }

            if now > loan.due_date {
                let days_overdue = (now - loan.due_date) / (24 * 60 * 60 * 1_000_000_000);
                alerts.push((id, format!("Loan #{} is overdue by {} days!", id, days_overdue)));
            } else {
                let time_to_due = loan.due_date - now;
                let days_left = time_to_due / (24 * 60 * 60 * 1_000_000_000);
                if days_left <= 3 {
                     alerts.push((id, format!("Loan #{} is due in {} days!", id, days_left)));
                }
            }
        }
    });
    alerts
}

// --- MODULE 6: ANALYTICS ENGINE ---

#[query]
fn get_platform_analytics() -> (Nat, u64, u64) {
    let mut total_borrowed = Nat::from(0);
    let mut active_loans = 0;
    let mut defaulted_loans = 0;

    LOANS.with(|loans| {
        for (_, loan) in loans.borrow().iter() {
            if loan.status == LoanStatus::Active || loan.status == LoanStatus::Repaid {
                total_borrowed += loan.amount.clone();
            }
            if loan.status == LoanStatus::Active {
                active_loans += 1;
            }
            if loan.status == LoanStatus::Defaulted {
                defaulted_loans += 1;
            }
        }
    });

    (total_borrowed, active_loans, defaulted_loans)
}


// --- MODULE 7: TRANSACTION TRACKER ---

fn log_transaction(tx_type: TransactionType, principals: Vec<Principal>, amount: Nat, details: String) -> u64 {
    let tx_id = NEXT_TRANSACTION_ID.with(|id| {
        let next_id = *id.borrow();
        *id.borrow_mut() += 1;
        next_id
    });

    let new_tx = Transaction {
        id: tx_id,
        transaction_type: tx_type,
        involved_principals: principals,
        amount,
        timestamp: time(),
        details,
    };

    TRANSACTIONS.with(|txs| txs.borrow_mut().insert(tx_id, new_tx));
    tx_id
}

#[query]
fn get_transaction(id: u64) -> Option<Transaction> {
    TRANSACTIONS.with(|txs| txs.borrow().get(&id))
}

// --- CANDID EXPORT ---
ic_cdk::export_candid!();
