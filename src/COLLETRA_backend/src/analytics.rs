use serde::{Serialize, Deserialize};

#[derive(Default, Serialize, Deserialize, Clone)]
pub struct Analytics {
    pub total_borrowed: u64,
    pub active_loans: u64,
    pub default_rate: f32,
    pub avg_roi_per_lender: f32,
}

pub struct AnalyticsState {
    pub analytics: Analytics,
}

impl AnalyticsState {
    pub fn new() -> Self {
        Self { analytics: Analytics::default() }
    }

    pub fn update_on_new_loan(&mut self, loan_amount: u64) {
        self.analytics.total_borrowed += loan_amount;
        self.analytics.active_loans += 1;
    }

    pub fn update_on_repaid(&mut self) {
        self.analytics.active_loans -= 1;
    }

    // TODO: Add methods for updating default_rate, avg_roi_per_lender
}