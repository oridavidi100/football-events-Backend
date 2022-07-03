import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Router from './routers/api';
const app = express();
import errorHandlerMiddleware from './midllewares/errorHandler';
import config from './config';
const { MONGO_URL } = config;
import { Server } from 'socket.io';
import { createServer } from 'http';
import { Message } from './models/Messages';
const httpServer = createServer(app);
import path from 'path';
const io = new Server(httpServer, {
  cors: {
    origin: ['https://ori-football-app.herokuapp.com', 'http://localhost:3000'],
  },
});

io.on('connection', socket => {
  socket.on('join', ({ room }) => {
    socket.join(room);
  });
  socket.on('message', async ({ name, message, room }) => {
    await Message.create({
      name,
      message,
      room,
    });
    io.in(room).emit('messageBack', { name, message });
  });
  socket.on('disconnect', () => {
    // io.emit('messageBack', { name: 'server', message: 'user disconnected' });
  });
});

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL) // connect to mongodb
    .then(() => {
      console.log(`connected to MongoDB `);
    })
    .catch(error => {
      console.log('error connecting to MongoDB:', error.message);
    });
}
app.use(cors()); //cors middleware
app.use(express.json()); //json middleware
//
app.use('/api', Router);
app.use(express.static(path.resolve(__dirname, '../client')));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});
app.use(errorHandlerMiddleware);
export const server = httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`);
});
