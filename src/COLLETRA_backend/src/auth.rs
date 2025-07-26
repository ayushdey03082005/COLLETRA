use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub enum Role {
    Borrower,
    Lender,
    Admin,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct User {
    pub principal: String, // Principal or wallet address
    pub role: Role,
    pub session_expiry: u64,
    pub last_login: u64,
}

pub struct AuthState {
    pub users: HashMap<String, User>,
}

impl AuthState {
    pub fn new() -> Self {
        Self { users: HashMap::new() }
    }

    pub fn login(&mut self, principal: String, role: Role, now: u64) -> bool {
        // TODO: Connect to Internet Identity/Plug for validation
        //       Insert wallet verification logic here
        let session_expiry = now + 60 * 60 * 1_000_000_000; // 1 hour
        self.users.insert(principal.clone(), User {
            principal,
            role,
            session_expiry,
            last_login: now,
        });
        true
    }

    pub fn get_role(&self, principal: &String) -> Option<Role> {
        self.users.get(principal).map(|u| u.role.clone())
    }
}