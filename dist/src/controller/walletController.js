import { WalletManager, } from "../service/TransactionService/Managers/walletManager.js";
export class WalletController {
    walletManager = new WalletManager();
    constructor() { }
    createWallets = async (req, res) => {
        const body = req.body;
        const response = await this.walletManager.createWallets(body);
        res.status(200).json(response);
    };
    debitWallets = async (req, res) => {
        const body = req.body;
        const response = await this.walletManager.debitWallets(body);
        res.status(200).json(response);
    };
    withdrawWallets = async (req, res) => {
        const body = req.body;
        const response = await this.walletManager.withdrawWallets(body);
        res.status(200).json(response);
    };
    transactionHistory = async (req, res) => {
        const body = req.body;
        const response = await this.walletManager.transactionHistory(body);
        res.status(200).json(response);
    };
    walletDetails = async (req, res) => {
        const body = req.body;
        const response = await this.walletManager.walletDetails(body);
        res.status(200).json(response);
    };
}
