import express from "express";
import { UserController } from "../controller/userController.js";
import TokenVerification from "../middlewares/TokenVerification.js";
import IsOwner from "../middlewares/IsOwner.js";

const userRouter = express.Router();
const userController = new UserController();

/**
 * @openapi
 * '/api/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login to get access token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *      404:
 *        description: Not Found
 */
userRouter.post("/api/login", userController.Login);

/**
 * @openapi
 * /api/signup:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               dOB:
 *                 type: string
 *                 format: date
 *               nationality:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - dOB
 *               - nationality
 *               - state
 *               - city
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

userRouter.post("/api/signup", userController.CreateUser);



/**
 * @openapi
 * '/api/user':
 *  get:
 *     tags:
 *     - User
 *     summary: Get the current authorized user
 *     responses:
 *      200:
 *        description: User fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *                user:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      format: uuid
 *                    email:
 *                      type: string
 *                    user_type:
 *                      type: string
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 */
userRouter.get("/api/user", TokenVerification, userController.GetUser);

/**
 * @openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users
 *     responses:
 *      200:
 *        description: List of users
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 */
userRouter.get("/api/users", userController.GetAllUsers);

/**
 * @openapi
 * '/api/update':
 *  patch:
 *     tags:
 *     - User
 *     summary: Update user information
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                format: uuid
 *              username:
 *                type: string
 *              address:
 *                type: string
 *            required:
 *              - id
 *     responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *      400:
 *        description: Bad request
 *      403:
 *        description: Forbidden
 *      404:
 *        description: User not found
 */
userRouter.patch(
  "/api/update",
  TokenVerification,
  IsOwner,
  userController.UpdateUser
);

/**
 * @openapi
 * '/api/delete/{id}':
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete a user by ID
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     responses:
 *      200:
 *        description: User deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 *      404:
 *        description: User not found
 */
userRouter.delete(
  "/api/delete/:id",
  TokenVerification,
  IsOwner,
  userController.DeleteUser
);




/**
 * @openapi
 * '/api/otp/create':
 *  post:
 *     tags:
 *     - User
 *     summary: Generate an OTP for email verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent successfully."
 *       400:
 *         description: Invalid email format
 *       500:
 *         description: Internal server error
 */
userRouter.post("/api/otp/create",userController.RequestPasswordChange)

/**
 * @openapi
 * '/api/verify-otp':
 *  post:
 *     tags:
 *     - User
 *     summary: Verify OTP
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              otp:
 *                type: string
 *     responses:
 *      200:
 *        description: OTP verified successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: number
 *                message:
 *                  type: string
 */
userRouter.post("/api/otp/verify-otp", userController.VerifyUser);

/**
 * @openapi
 * /api/change-password:
 *   post:
 *     tags:
 *       - User
 *     summary: Change password using OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully."
 *       400:
 *         description: Passwords do not match or invalid OTP
 *       500:
 *         description: Internal server error
 */

userRouter.post("/api/change-password", userController.changePassword);




export default userRouter;
