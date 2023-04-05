const io = require("socket.io");
const server = io.listen(8000);
let connectedClients = new Map();

server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    connectedClients.set(socket, true);

    socket.on("disconnect", () => {
        connectedClients.delete(socket);
        console.info(`Client [id=${socket.id}] disconnected` );
    });

    socket.on("message-from-client", (payload) => {
        sendMessageToAllClients(payload);
    });

});

function sendMessageToAllClients(message) {
    for (const [client, isConnected] of connectedClients.entries()) {
        if (isConnected) client.emit("message-from-server", message);
    }
}