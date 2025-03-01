"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error-middleware");
// import indexRouter from './v1/routes';
const index_1 = __importDefault(require("./v1/routes/index"));
const db_1 = require("./config/db");
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
class Server {
    app;
    server;
    io;
    constructor() {
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        const socketOptions = {
            cors: {
                origin: process.env.SOCKET_CORS_ORIGIN || '*',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        };
        this.io = new socket_io_1.Server(this.server, socketOptions);
        this.initializeMiddlewares();
        this.routes();
        this.handleErrors();
        this.connectDatabase();
        // this.initializeSocket();
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.options('*', (0, cors_1.default)(corsOptions));
    }
    handleErrors() {
        this.app.use(error_middleware_1.errorHandler);
        this.app.use(error_middleware_1.routeNotFound);
    }
    routes() {
        this.app.get('/v1/api', (req, res) => {
            res.send({
                success: true,
                message: 'Server initialized and ready for action!',
            });
        });
        this.app.use('/v1/api', index_1.default);
    }
    initializeSocket() {
        this.io.on('connection', (socket) => {
            //   ChatSocketHandler.initialize(socket, this.io);
        });
    }
    async connectDatabase() {
        try {
            await (0, db_1.connectDB)();
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            process.exit(1);
        }
    }
    start(port) {
        this.server.listen(port, () => {
            console.log(`Server initialized and ready for action! 🤖`);
            console.log('     /\\_/\\');
            console.log('    / o o \\');
            console.log('   (   "   )');
            console.log('    \\~(*)~/');
            console.log('     /___\\');
            console.log('Welcome to the enchanted forest of code!');
            console.log(process.env.MONGO_URL);
        });
    }
}
exports.default = Server;
