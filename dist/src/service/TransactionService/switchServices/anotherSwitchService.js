import { walletsAbstracts } from "../Abstracts/walletsAbstracts.js";
// this is the "anotherSwitchService" service provider
export class anotherSwitchService extends walletsAbstracts {
    constructor() {
        super();
    }
    async createWallets() {
        return "Creating wallets from another switch service...";
    }
    async debitWallets() {
        return "Debiting wallets another switch service...";
    }
    async withdrawWallets() {
        return "withdrawing from wallets another switch service...";
    }
    async walletDetails() {
        return "fetching wallet details another switch service...";
    }
    async transactionHistory() {
        return "fetching transaction history another switch service...";
    }
}
