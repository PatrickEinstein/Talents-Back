import { RequestHandler } from "express";
import {
  IWalletManager,
  WalletManager,
} from "../service/TransactionService/Managers/walletManager.js";
import { ChannelCode } from "../service/TransactionService/Data/Enums.js";
import {
  ICreateWallet,
  IDebitWallet,
  ITransactionHisory,
  IWalletDetails,
  IWithdrawWallet,
} from "../service/TransactionService/Data/Models.js";

export class WalletController {
  walletManager: IWalletManager = new WalletManager();

  constructor() {}

  createWallets: RequestHandler = async (req, res) => {
    const body = req.body as ICreateWallet;
    const response = await this.walletManager.createWallets(body);
    res.status(200).json(response);
  };

  debitWallets: RequestHandler = async (req, res) => {
    const body = req.body as IDebitWallet;
    const response = await this.walletManager.debitWallets(body);
    res.status(200).json(response);
  };

  withdrawWallets: RequestHandler = async (req, res) => {
    const body = req.body as IWithdrawWallet;
    const response = await this.walletManager.withdrawWallets(body);
    res.status(200).json(response);
  };

  transactionHistory: RequestHandler = async (req, res) => {
    const body = req.body as ITransactionHisory;
    const response = await this.walletManager.transactionHistory(body);
    res.status(200).json(response);
  };

  walletDetails: RequestHandler = async (req, res) => {
    const body = req.body as IWalletDetails;
    const response = await this.walletManager.walletDetails(body);
    res.status(200).json(response);
  };
}
