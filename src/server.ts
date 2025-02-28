import express, { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import bodyParser from 'body-parser';
import { Server as SocketIOServer, ServerOptions } from 'socket.io';
import cors from 'cors';
import { errorHandler, routeNotFound } from '@middlewares/error-middleware';
import Config from '@config/dotenv-config';
import { connectDB } from '@config/db';
const corsOptions = {
  //   origin: Config.Cors.origin,
  optionsSuccessStatus: 200,
  //   credentials: Config.Cors.credentials,
  allowedHeaders: [
    'X-Requested-With',
    'Content-Type, Authorization',
    'Access-Control-Allow-Headers',
    'at',
    'rt',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

export default class Server {
  public app: Application;
  private server: HTTPServer;
  private io: SocketIOServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    const socketOptions: Partial<ServerOptions> = {
      cors: {
        origin: process.env.SOCKET_CORS_ORIGIN || '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    };
    this.io = new SocketIOServer(this.server, socketOptions);
    // this.initializeMiddlewares();
    // this.routes();
    // this.handleErrors();
    // this.connectDatabase();
    // this.initializeSocket();
  }

  initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.options('*', cors(corsOptions));
  }

  handleErrors() {
    this.app.use(errorHandler);
    this.app.use(routeNotFound);
  }

  routes() {
    this.app.get('/v1/api', (req, res) => {
      res.send({
        success: true,
        message: 'Server initialized and ready for action!',
      });
    });
    // this.app.use('/v1/api', indexRouter);
  }

  initializeSocket() {
    this.io.on('connection', (socket) => {
      //   ChatSocketHandler.initialize(socket, this.io);
    });
  }

  async connectDatabase() {
    try {
      await connectDB();
    } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1);
    }
  }

  start(port: number) {
    this.server.listen(port, () => {
      console.log(`Server initialized and ready for action! 🤖`);
      console.log('     /\\_/\\');
      console.log('    / o o \\');
      console.log('   (   "   )');
      console.log('    \\~(*)~/');
      console.log('     /___\\');
      console.log('Welcome to the enchanted forest of code!');
    });
  }
}
