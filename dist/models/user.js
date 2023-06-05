"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('User', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN, // Tengo definido TINYINT en la tabla pero sequelize se ocupa de transformar el boolean en 1 o 0
    },
});
exports.default = User;
//# sourceMappingURL=user.js.map