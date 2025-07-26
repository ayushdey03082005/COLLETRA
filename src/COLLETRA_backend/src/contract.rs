use crate::loan::{Loan, LoanStatus};

pub struct ContractEngine;

impl ContractEngine {
    pub fn fund_loan(loan: &mut Loan, lender: String, now: u64) -> bool {
        if loan.lender.is_none() && loan.status == LoanStatus::Requested {
            loan.lender = Some(lender.clone());
            loan.status = LoanStatus::Funded;
            loan.tx_history.push(crate::loan::TxLog { ts: now, action: "Loan Funded".to_string(), detail: format!("Lender: {}", lender) });
            return true;
        }
        false
    }

    pub fn repay_loan(loan: &mut Loan, borrower: String, now: u64) -> bool {
        if loan.borrower == borrower && loan.status == LoanStatus::Funded {
            loan.status = LoanStatus::Repaid;
            loan.tx_history.push(crate::loan::TxLog { ts: now, action: "Loan Repaid".to_string(), detail: format!("Borrower: {}", borrower) });
            return true;
        }
        false
    }

    pub fn withdraw_interest(loan: &mut Loan, lender: String, now: u64) -> bool {
        if let Some(ref l) = loan.lender {
            if l == &lender && loan.status == LoanStatus::Repaid {
                loan.tx_history.push(crate::loan::TxLog { ts: now, action: "Interest Withdrawn".to_string(), detail: format!("Lender: {}", lender) });
                // TODO: Transfer interest logic
                return true;
            }
        }
        false
    }

    pub fn admin_flag(loan: &mut Loan, admin: String, now: u64) -> bool {
        loan.status = LoanStatus::Flagged;
        loan.tx_history.push(crate::loan::TxLog { ts: now, action: "Loan Flagged".to_string(), detail: format!("Admin: {}", admin) });
        true
    }

    pub fn admin_freeze(loan: &mut Loan, admin: String, now: u64) -> bool {
        loan.status = LoanStatus::Frozen;
        loan.tx_history.push(crate::loan::TxLog { ts: now, action: "Loan Frozen".to_string(), detail: format!("Admin: {}", admin) });
        true
    }
}