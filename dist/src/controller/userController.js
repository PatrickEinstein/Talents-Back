import { UserService } from "./../service/userService.js";
export class UserController {
    user = new UserService();
    constructor() { }
    Login = async (req, res) => {
        const body = req.body;
        console.log(body);
        const response = await this.user.Login(body);
        res.status(200).json(response);
    };
    CreateUser = async (req, res) => {
        console.log(`Controller for creating user`, req.body);
        const body = req.body;
        const response = await this.user.CreateUser(body);
        res.status(200).json(response);
    };
    VerifyOtp = async (req, res) => {
        const body = req.body;
        const response = await this.user.VerifyOtp(body);
        res.status(200).json(response);
    };
    GetUser = async (req, res) => {
        const userId = req.user?.id; // Access user ID from request object
        const response = await this.user.GetUser(userId);
        res.status(response.status).json(response);
    };
    GetAllUsers = async (req, res) => {
        const response = await this.user.GetAllUsers();
        res.status(200).json(response);
    };
    UpdateUser = async (req, res) => {
        const body = req.body;
        const response = await this.user.UpdateUser(body);
        res.status(200).json(response);
    };
    DeleteUser = async (req, res) => {
        const { id } = req.params;
        const response = await this.user.DeleteUser(id);
        res.status(200).json(response);
    };
    getRoles = async (req, res) => {
        const { id } = req.params;
        const response = await this.user.GetRoles(id);
        res.status(200).json(response);
    };
    updateRoles = async (req, res) => {
        console.log('role controller', req.body);
        const body = req.body;
        const response = await this.user.UpdateRoles(body);
        res.status(200).json(response);
    };
    sendPasswordResetMail = async (req, res) => {
        const { email } = req.body;
        const response = await this.user.SendPasswordResetMail(email);
        res.status(200).json(response);
    };
    resetPassword = async (req, res) => {
        const body = req.body;
        const response = await this.user.ResetPassword(body);
        res.status(200).json(response);
    };
}
