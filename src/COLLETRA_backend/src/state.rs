use crate::types::{User, Loan, TxLog};
use candid::Principal;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, Vec as StableVec};
use std::cell::RefCell;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = 
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static USERS: RefCell<StableBTreeMap<Principal, User, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))))
    );

    pub static LOANS: RefCell<StableBTreeMap<u64, Loan, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1))))
    );
    
    pub static TX_LOGS: RefCell<StableVec<TxLog, Memory>> = RefCell::new(
        StableVec::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2)))).unwrap()
    );

    pub static NEXT_LOAN_ID: RefCell<u64> = RefCell::new(0);
}
