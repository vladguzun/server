const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const connectedClients = new Set();

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    connectedClients.add(socket);
    const clientsArray = [...connectedClients];
    console.log('_____');
    clientsArray.map(client => console.log(client.id));

    socket.on('notification', (senderSocketId) => {
        console.log('Received notification from:', senderSocketId);

        socket.broadcast.emit("notification", senderSocketId);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        connectedClients.delete(socket);
    });
});

server.listen(3001, () => {
    console.log("on port 3001"); 
});
