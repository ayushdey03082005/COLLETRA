use crate::loan::TxLog;

pub struct TxLogState {
    pub logs: Vec<TxLog>
}

impl TxLogState {
    pub fn new() -> Self {
        Self { logs: Vec::new() }
    }

    pub fn log(&mut self, tx: TxLog) {
        self.logs.push(tx);
    }

    pub fn by_loan(&self, loan_id: u64, loans: &std::collections::HashMap<u64, crate::loan::Loan>) -> Option<Vec<TxLog>> {
        loans.get(&loan_id).map(|loan| loan.tx_history.clone())
    }
}