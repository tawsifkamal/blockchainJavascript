export interface User {
  name: string;
  publicKey: string;
  privateKey?: string;
}

export interface Block {
  timestamp: string;
  transactions: Transaction[];
  hash: string;
  previousHash: string;
  nonce: number;
}

export interface Transaction {
  fromName: string | null;
  fromAddress: string | null;
  toName: string | null;
  toAddress: string | null;
  amount: number;
}

export interface Blockchain {
  difficulty: number;
  chain: Block[];
  pendingTransactions: Transaction[];
  miningReward: number;
  identifier: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
