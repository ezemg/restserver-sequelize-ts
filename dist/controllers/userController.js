"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.json({
            count: users.length,
            users,
        });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user)
            throw new Error(`No users under id: ${id}`);
        res.json(user);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExists = yield user_1.default.findOne({ where: { email: body.email } });
        if (emailExists)
            throw new Error(`There is a user already registered under ${body.email}.`);
        const user = user_1.default.build(body); //build prepara el objecto
        yield user.save(); //save lo guarda
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'contact Admin',
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user)
            throw new Error(`No user under specified id: ${id}`);
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'contact Admin',
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user)
            throw new Error(`No user under specified id: ${id}`);
        yield user.update({ estado: false });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            msg: 'contact Admin',
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map