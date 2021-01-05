import express, { NextFunction, Request, Response } from "express";
import todoRrouter from "./routes/todos.routes";

const app = express();

app.use("/todos", todoRrouter);

// body parser middleware
app.use(express.json())

// Error handling middleware
app.use((error: Error, req: Request, res: Response, newt: NextFunction) => {
    res.status(500).json({message: error.message})
})   

app.listen(3000);
