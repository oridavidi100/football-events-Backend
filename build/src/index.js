'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.server = void 0;
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const mongoose_1 = __importDefault(require('mongoose'));
const api_1 = __importDefault(require('./routers/api'));
const app = (0, express_1.default)();
const errorHandler_1 = __importDefault(require('./midllewares/errorHandler'));
const config_1 = __importDefault(require('./config'));
const { MONGO_URL } = config_1.default;
const socket_io_1 = require('socket.io');
const http_1 = require('http');
const Messages_1 = require('./models/Messages');
const httpServer = (0, http_1.createServer)(app);
const path_1 = __importDefault(require('path'));
const io = new socket_io_1.Server(httpServer, {
  cors: {
    origin: ['https://ori-football-app.herokuapp.com', 'http://localhost:3000'],
  },
});
io.on('connection', socket => {
  socket.on('join', ({ room }) => {
    socket.join(room);
  });
  socket.on('message', ({ name, message, room }) =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield Messages_1.Message.create({
        name,
        message,
        room,
      });
      io.in(room).emit('messageBack', { name, message });
    })
  );
  socket.on('disconnect', () => {
    // io.emit('messageBack', { name: 'server', message: 'user disconnected' });
  });
});
if (MONGO_URL) {
  mongoose_1.default
    .connect(MONGO_URL) // connect to mongodb
    .then(() => {
      console.log(`connected to MongoDB `);
    })
    .catch(error => {
      console.log('error connecting to MongoDB:', error.message);
    });
}
app.use((0, cors_1.default)()); //cors middleware
app.use(express_1.default.json()); //json middleware
app.use('/api', api_1.default);
app.use(
  express_1.default.static(path_1.default.resolve(__dirname, '../../client'))
);
app.get('*', function (request, response) {
  response.sendFile(
    path_1.default.resolve(__dirname, '../../client', 'index.html')
  );
});
app.use(errorHandler_1.default);
exports.server = httpServer.listen(process.env.PORT || 5000, () =>
  console.log(`app listening at http://localhost:${5000}`)
);
