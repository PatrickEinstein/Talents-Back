import { Server } from "socket.io";

const Notification = async (io: Server) => {
  console.log(`
     ------------   Notification service has been initialized  ---------------
        `);

  setInterval(() => {
    io.emit("open_notification", "Heyyyyyyoooo Fucking world!");
  }, 60000);
};

export default Notification;





