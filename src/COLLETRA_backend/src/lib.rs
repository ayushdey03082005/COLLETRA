mod auth;
mod loan;
mod contract;
mod alert;
mod analytics;
mod tx_log;

use ic_cdk::api::time;
use ic_cdk_macros::*;
use std::cell::RefCell;

thread_local! {
    static AUTH: RefCell<auth::AuthState> = RefCell::new(auth::AuthState::new());
    static LOAN: RefCell<loan::LoanState> = RefCell::new(loan::LoanState::new());
    static ALERT: RefCell<alert::AlertState> = RefCell::new(alert::AlertState::new());
    static ANALYTICS: RefCell<analytics::AnalyticsState> = RefCell::new(analytics::AnalyticsState::new());
    static TXLOG: RefCell<tx_log::TxLogState> = RefCell::new(tx_log::TxLogState::new());
}

// Example: login
#[query]
pub fn login(principal: String, role: String) -> bool {
    let role_enum = match role.as_str() {
        "borrower" => auth::Role::Borrower,
        "lender" => auth::Role::Lender,
        "admin" => auth::Role::Admin,
        _ => return false,
    };
    AUTH.with(|s| s.borrow_mut().login(principal, role_enum, time()))
}

// Example: create_loan
#[update]
pub fn create_loan(
    borrower: String,
    loan_amount: u64,
    collateral_value: u64,
    collateral_type: String,
    risk_factor: f32,
    repayment_days: u32,
) -> u64 {
    let now = time();
    let id = LOAN.with(|s| s.borrow_mut().create_loan(
        borrower.clone(), loan_amount, collateral_value, collateral_type, risk_factor, repayment_days, now
    ));
    ANALYTICS.with(|s| s.borrow_mut().update_on_new_loan(loan_amount));
    id
}

// Example: fund_loan
#[update]
pub fn fund_loan(loan_id: u64, lender: String) -> bool {
    LOAN.with(|loan_state| {
        let mut loan_state = loan_state.borrow_mut();
        if let Some(loan) = loan_state.loans.get_mut(&loan_id) {
            contract::ContractEngine::fund_loan(loan, lender, time())
        } else { false }
    })
}

// More glue exports for other modules...

// TODO: Insert Internet Identity / Plug wallet logic at the relevant places with comments

// TODO: Add periodic alert checks using ic_cdk_timers for notification/alert

// TODO: Expose analytics, notifications, tx log, etc. as queries