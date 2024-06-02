"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookControllers_1 = require("../controllers/bookControllers");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "./public");
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        },
    }),
});
exports.bookRouter = express_1.default.Router();
exports.bookRouter.get("/", bookControllers_1.bookController.getData);
exports.bookRouter.get("/:id", bookControllers_1.bookController.getSingleData);
exports.bookRouter.patch("/:id", bookControllers_1.bookController.updateData);
exports.bookRouter.post("/", upload.single("file"), bookControllers_1.bookController.createData);
