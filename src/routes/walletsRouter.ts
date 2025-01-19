import express from "express";
import { WalletController } from "../controller/walletController.js";

const walletRouter = express.Router();
const wallet = new WalletController();

/**
 * @openapi
 * /api/createwallet:
 *   post:
 *     summary: Create a new wallet
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the wallet owner
 *                 example: John Doe
 *               nin:
 *                 type: string
 *                 description: The National Identification Number of the wallet owner
 *                 example: 123456789
 *               channel:
 *                 type: number
 *                 description: The channel code for wallet creation
 *                 enum:
 *                   - 0
 *                   - 1
 *                 example: 0
 *     responses:
 *       201:
 *         description: Wallet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wallet created successfully
 *                 walletId:
 *                   type: string
 *                   example: 987654321
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 */
walletRouter.post("/api/createwallet", wallet.createWallets);

/**
 * @openapi
 * /api/debit-wallet:
 *   post:
 *     summary: debitWallet
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the wallet owner
 *                 example: John Doe
 *               nin:
 *                 type: string
 *                 description: The National Identification Number of the wallet owner
 *                 example: 123456789
 *               channel:
 *                 type: number
 *                 description: The channel code for wallet creation
 *                 enum:
 *                   - 0
 *                   - 1
 *                 example: 0
 *     responses:
 *       201:
 *         description: Wallet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wallet created successfully
 *                 walletId:
 *                   type: string
 *                   example: 987654321
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 */
walletRouter.post("/api/debit-wallet", wallet.debitWallets);

/**
 * @openapi
 * /api/withdraw-wallet:
 *   post:
 *     summary: withdraw-wallet
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the wallet owner
 *                 example: John Doe
 *               nin:
 *                 type: string
 *                 description: The National Identification Number of the wallet owner
 *                 example: 123456789
 *               channel:
 *                 type: number
 *                 description: The channel code for wallet creation
 *                 enum:
 *                   - 0
 *                   - 1
 *                 example: 0
 *     responses:
 *       201:
 *         description: Wallet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wallet created successfully
 *                 walletId:
 *                   type: string
 *                   example: 987654321
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 */
walletRouter.post("/api/withdraw-wallet", wallet.withdrawWallets);

/**
 * @openapi
 * /api/wallet-details:
 *   post:
 *     summary: wallet-details
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the wallet owner
 *                 example: John Doe
 *               nin:
 *                 type: string
 *                 description: The National Identification Number of the wallet owner
 *                 example: 123456789
 *               channel:
 *                 type: number
 *                 description: The channel code for wallet creation
 *                 enum:
 *                   - 0
 *                   - 1
 *                 example: 0
 *     responses:
 *       201:
 *         description: Wallet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wallet created successfully
 *                 walletId:
 *                   type: string
 *                   example: 987654321
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 */
walletRouter.post("/api/wallet-details", wallet.walletDetails);

/**
 * @openapi
 * /api/transactions-history:
 *   post:
 *     summary: transactions-history
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the wallet owner
 *                 example: John Doe
 *               nin:
 *                 type: string
 *                 description: The National Identification Number of the wallet owner
 *                 example: 123456789
 *               channel:
 *                 type: number
 *                 description: The channel code for wallet creation
 *                 enum:
 *                   - 0
 *                   - 1
 *                 example: 0
 *     responses:
 *       201:
 *         description: Wallet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wallet created successfully
 *                 walletId:
 *                   type: string
 *                   example: 987654321
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 */
walletRouter.post("/api/transactions-history", wallet.transactionHistory);

export default walletRouter;
