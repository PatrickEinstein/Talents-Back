import { walletsAbstracts } from "../Abstracts/walletsAbstracts.js";
// this is the "ChamsSwitchService" service provider
export class ChamsSwitchService extends walletsAbstracts {
    constructor() {
        super();
    }
    async createWallets() {
        return "Creating wallets... from chamsSwitch service";
    }
    async debitWallets() {
        return "Debiting wallets... from chamsSwitch service";
    }
    async withdrawWallets() {
        return "withdrawing from wallets... from chamsSwitch service";
    }
    async walletDetails() {
        return "fetching wallet details... from chamsSwitch service";
    }
    async transactionHistory() {
        return "fetching transaction history... from chamsSwitch service";
    }
}
