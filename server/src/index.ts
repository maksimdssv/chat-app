import { ClientToServerEvents, ServerToClientEvents } from "./types/socket";
import { Server } from "socket.io";

/*const io = new Server<ClientToServerEvents, ServerToClientEvents>(3000, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  // socket.emit("basicEmit");
});*/
