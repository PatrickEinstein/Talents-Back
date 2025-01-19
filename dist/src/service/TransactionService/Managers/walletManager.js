import { walletSwitcher, } from "../Switchers/walletSwitchers.js";
// ---- remember that switcher class called walletSwitcher that aggregates the service provider?
// ----- it return the service provider it finds according to the channel code to this manager
//  ---- it is this manager that now does writiing to db
//  --- formats request before passing to the service provider if need be
// --- also formats the reponse from all the services providers into one common form
export class WalletManager {
    switchService = new walletSwitcher();
    async createWallets(load) {
        try {
            const managedService = this.switchService.getWalletService(load.channel);
            return await managedService.createWallets(load);
        }
        catch (error) {
            console.error(`Error creating wallet for channel: ${load.channel}`, error);
            throw new Error("Failed to create wallet");
        }
    }
    async debitWallets(load) {
        const managedService = this.switchService.getWalletService(load.channel);
        return await managedService.debitWallets(load);
    }
    async withdrawWallets(load) {
        const managedService = this.switchService.getWalletService(load.channel);
        return await managedService.withdrawWallets(load);
    }
    async transactionHistory(load) {
        const managedService = this.switchService.getWalletService(load.channel);
        return await managedService.transactionHistory(load);
    }
    async walletDetails(load) {
        const managedService = this.switchService.getWalletService(load.channel);
        return await managedService.walletDetails(load);
    }
}
