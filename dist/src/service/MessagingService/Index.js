import Notification from "./notifications.js";
const NotificationJob = async (io) => {
    console.log("Notifications job is initialized");
    await Notification(io);
};
export default NotificationJob;
