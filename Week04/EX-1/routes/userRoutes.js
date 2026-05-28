
import { getUser, getUserID, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import express from 'express';

const rout = express.Router();

rout.get('/', getUser);
rout.get('/:id', getUserID);
rout.post('/', createUser);
rout.put('/:id', updateUser);
rout.delete('/:id', deleteUser);

export default rout;