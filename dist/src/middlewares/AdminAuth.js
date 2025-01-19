import { GetCurrentUser } from "./TokenVerification.js";
const AdminAuthenticator = async (token) => {
    let res;
    const { role, isActive } = await GetCurrentUser(token);
    if (!isActive) {
        res = {
            status: false,
            response: "You cannot access this, please contact an administrator",
        };
    }
    else if (role === "Client") {
        res = {
            status: false,
            response: "Forbidden",
        };
    }
    else {
        res = {
            status: true,
            response: "success",
        };
    }
    return res;
};
export default AdminAuthenticator;
