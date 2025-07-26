use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Loan {
    pub id: u64,
    pub borrower: String,
    pub lender: Option<String>,
    pub loan_amount: u64,
    pub collateral_value: u64,
    pub collateral_type: String,
    pub risk_factor: f32,
    pub overdue_penalty: f32,
    pub repayment_due: u64,
    pub payment_history: String,
    pub created_at: u64,
    pub status: LoanStatus,
    pub tx_history: Vec<TxLog>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum LoanStatus {
    Requested,
    Funded,
    Repaid,
    Liquidated,
    Active,
    Flagged,
    Frozen,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct TxLog {
    pub ts: u64,
    pub action: String,
    pub detail: String,
}

pub struct LoanState {
    pub loans: std::collections::HashMap<u64, Loan>,
    pub loan_counter: u64,
}

impl LoanState {
    pub fn new() -> Self {
        Self { loans: std::collections::HashMap::new(), loan_counter: 0 }
    }

    pub fn create_loan(
        &mut self,
        borrower: String,
        loan_amount: u64,
        collateral_value: u64,
        collateral_type: String,
        risk_factor: f32,
        repayment_days: u32,
        now: u64,
    ) -> u64 {
        let id = self.loan_counter;
        let due = now + (repayment_days as u64) * 24 * 60 * 60 * 1_000_000_000;
        let loan = Loan {
            id,
            borrower: borrower.clone(),
            lender: None,
            loan_amount,
            collateral_value,
            collateral_type,
            risk_factor,
            overdue_penalty: 0.0,
            repayment_due: due,
            payment_history: "good".to_string(),
            created_at: now,
            status: LoanStatus::Requested,
            tx_history: vec![TxLog { ts: now, action: "Loan Requested".to_string(), detail: "".to_string() }],
        };
        self.loans.insert(id, loan);
        self.loan_counter += 1;
        id
    }

    pub fn calculate_health(&self, loan_id: u64) -> Option<f32> {
        self.loans.get(&loan_id).map(|loan| {
            (loan.collateral_value as f32 / loan.loan_amount as f32) * loan.risk_factor - loan.overdue_penalty
        })
    }

    pub fn get_repayment_info(&self, loan_id: u64, now: u64) -> Option<(u64, u64)> {
        self.loans.get(&loan_id).map(|loan| {
            let days_left = if loan.repayment_due > now {
                (loan.repayment_due - now) / (24 * 60 * 60 * 1_000_000_000)
            } else { 0 };
            (loan.repayment_due, days_left)
        })
    }
}