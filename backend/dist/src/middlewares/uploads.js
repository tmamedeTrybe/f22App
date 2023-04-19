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
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "../Frontend/ftwentytwo-app/src/assets/images/casamentos");
    },
    filename: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id, 'xxxxxxxxxxxxx');
            const namePhoto = `${req.params.id}.jpg`;
            cb(null, namePhoto);
        });
    },
});
const uploads = multer({ storage: storage });
exports.default = uploads;
