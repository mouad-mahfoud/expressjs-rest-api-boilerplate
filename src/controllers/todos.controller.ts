import { RequestHandler } from "express";
import { Todo } from "../models/todo.model";

const todoList: Todo[] = [];

export const create: RequestHandler = (req, res, next) => {
  const task = (req.body as { task: string }).task;
  const newTask = new Todo(Math.random().toString(), task);

  todoList.push(newTask);

  res.status(201).json({
    message: "the task was created.",
    task: newTask,
  });
};

export const findAll: RequestHandler = (req, res, next) => {
  res.status(200).json({ tasks: todoList });
};

export const update: RequestHandler<{ id: string }> = (req, res, next) => {
  const taskId = req.params.id;

  const updatedTask = (req.body as { task: string }).task;

  const taskIndex = todoList.findIndex((task) => task.id === taskId);

  if (taskIndex < 0) {
    throw new Error("Could not find task");
  }

  todoList[taskIndex] = new Todo(todoList[taskIndex].id, updatedTask);

  res.status(200).json({
    message: "updeted!",
    updatedTask: todoList[taskIndex],
  });
};

export const remove: RequestHandler<{ id: string }> = (req, res, next) => {
  const taskId = req.params.id;

  const taskIndex = todoList.findIndex((task) => task.id === taskId);

  if (taskIndex < 0) {
    throw new Error("Could not find task");
  }
  todoList.splice(taskIndex, 1);

  res.status(204).json({
    message: "task deleted!",
  });
};
