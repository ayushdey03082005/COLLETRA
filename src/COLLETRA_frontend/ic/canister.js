import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as backend_idl, canisterId as backend_id } from '../../declarations/COLLETRA_backend';

const agent = new HttpAgent({ host: "http://localhost:4943" }); // Local
// For mainnet use: agent = new HttpAgent();
export const backend = Actor.createActor(backend_idl, {
  agent,
  canisterId: backend_id,
});