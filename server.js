const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server, {
    cors: "https://client-seven-gilt.vercel.app/",
    methods: ["POST", "GET"]
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

        // Send a notification to all connected clients except the sender
        socket.broadcast.emit("notification", senderSocketId);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        connectedClients.delete(socket);
    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});
