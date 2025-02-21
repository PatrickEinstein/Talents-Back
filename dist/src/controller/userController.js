import { UserService } from "./../service/userService.js";
export class UserController {
    user = new UserService();
    constructor() { }
    Login = async (req, res) => {
        const body = req.body;
        console.log(body);
        const response = await this.user.Login(body);
        res.json(response);
    };
    CreateUser = async (req, res) => {
        // console.log(`Controller for creating user`, req.body);
        const body = req.body;
        const response = await this.user.CreateUser(body);
        res.json(response);
    };
    VerifyOtp = async (req, res) => {
        const body = req.body;
        const response = await this.user.VerifyOtp(body);
        res.json(response);
    };
    GetUser = async (req, res) => {
        console.log(`currently logged in user`, req.user);
        const userId = req.user?.email; // Access user ID from request object
        const response = await this.user.GetUser(userId);
        res.status(response.status).json(response);
    };
    GetAllUsers = async (req, res) => {
        const response = await this.user.GetAllUsers();
        res.json(response);
    };
    UpdateUser = async (req, res) => {
        const body = req.body;
        const response = await this.user.UpdateUser(body);
        res.json(response);
    };
    DeleteUser = async (req, res) => {
        const { id } = req.params;
        const response = await this.user.DeleteUser(id);
        res.json(response);
    };
    sendPasswordResetMail = async (req, res) => {
        const { email } = req.body;
        const response = await this.user.SendPasswordResetMail(email);
        res.json(response);
    };
    resetPassword = async (req, res) => {
        const body = req.body;
        const response = await this.user.ResetPassword(body);
        res.json(response);
    };
}
