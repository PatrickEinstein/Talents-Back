import { ChannelCode } from "../Data/Enums.js";
import {
  ICreateWallet,
  IDebitWallet,
  ITransactionHisory,
  IWalletDetails,
  IWithdrawWallet,
} from "../Data/Models.js";
import {
  IWalletSwitcher,
  walletSwitcher,
} from "../Switchers/walletSwitchers.js";

export interface IWalletManager {
  createWallets: (load: ICreateWallet) => Promise<any>;
  debitWallets: (load: IDebitWallet) => Promise<any>;
  withdrawWallets: (load: IWithdrawWallet) => Promise<any>;
  transactionHistory: (load: ITransactionHisory) => Promise<any>;
  walletDetails: (load: IWalletDetails) => Promise<any>;
}

// ---- remember that switcher class called walletSwitcher that aggregates the service provider?
// ----- it return the service provider it finds according to the channel code to this manager
//  ---- it is this manager that now does writiing to db
//  --- formats request before passing to the service provider if need be
// --- also formats the reponse from all the services providers into one common form

export class WalletManager implements IWalletManager {
  switchService: IWalletSwitcher = new walletSwitcher();

  async createWallets(load: ICreateWallet) {
    try {
      const managedService = this.switchService.getWalletService(load.channel);
      return await managedService.createWallets(load);
    } catch (error) {
      console.error(
        `Error creating wallet for channel: ${load.channel}`,
        error
      );
      throw new Error("Failed to create wallet");
    }
  }

  async debitWallets(load: IDebitWallet) {
    const managedService = this.switchService.getWalletService(load.channel);
    return await managedService.debitWallets(load);
  }

  async withdrawWallets(load: IWithdrawWallet) {
    const managedService = this.switchService.getWalletService(load.channel);
    return await managedService.withdrawWallets(load);
  }

  async transactionHistory(load: ITransactionHisory) {
    const managedService = this.switchService.getWalletService(load.channel);
    return await managedService.transactionHistory(load);
  }

  async walletDetails(load: IWalletDetails) {
    const managedService = this.switchService.getWalletService(load.channel);
    return await managedService.walletDetails(load);
  }
}
