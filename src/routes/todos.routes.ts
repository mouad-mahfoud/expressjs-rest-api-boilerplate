import {Router} from 'express'
import { create, findAll, remove, update } from '../controllers/todos.controller';

const todoRouter = Router();

todoRouter.post('/', create)
todoRouter.get('/', findAll)
todoRouter.patch('/:id', update)
todoRouter.delete('/:id', remove)

export default todoRouter