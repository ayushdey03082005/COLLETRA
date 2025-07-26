use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Notification {
    pub user: String,
    pub message: String,
    pub ts: u64,
    pub event_type: String,
}

pub struct AlertState {
    pub notifications: Vec<Notification>,
}

impl AlertState {
    pub fn new() -> Self {
        Self { notifications: Vec::new() }
    }

    pub fn push(&mut self, user: String, msg: String, ts: u64, event_type: String) {
        self.notifications.push(Notification {
            user,
            message: msg,
            ts,
            event_type,
        });
    }

    pub fn get_for_user(&self, user: &str) -> Vec<Notification> {
        self.notifications.iter().filter(|n| n.user == user).cloned().collect()
    }
}