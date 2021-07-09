import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express"
import { initialize }  from "express-openapi";
import todoRrouter from "./routes/todos.routes";

const app = express();

app.use("/todos", todoRrouter);
initialize({
    app,
    apiDoc: require("./api/apiDoc"),
    paths: "src/api/paths",
});
app.use(express.urlencoded({ extended: false }));
// body parser middleware
app.use(express.json())

// OpenAPI UI
app.use(
    "/api-documentation",
    swaggerUI.serve,
    swaggerUI.setup(undefined,{
        swaggerOptions: {
            url: "http://localhost:3000/api-docs",
        },
    })
);

// Error handling middleware
app.use((error: Error, req: Request, res: Response, newt: NextFunction) => {
    res.status(500).json({message: error.message})
})

app.listen(3000);
