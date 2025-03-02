"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const dotenv_config_1 = __importDefault(require("../../../config/dotenv-config"));
const error_middleware_1 = require("../../../middlewares/error-middleware");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String },
    reAuth: { type: Boolean, default: false },
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcryptjs_1.default.hash(user.password, dotenv_config_1.default.BcryptSalt);
    }
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const user = this;
        return bcryptjs_1.default.compare(candidatePassword, user.password);
    }
    catch (error) {
        throw new error_middleware_1.ServerError('Error comparing password', error);
    }
};
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    return user;
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
