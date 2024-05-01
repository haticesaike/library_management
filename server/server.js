import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/auth/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "LibraryManagement API",
      version: "1.0.0",
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/auth", userRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", function (req, res) {
  res.send("Library management backend is up and running");
});

app.listen(3001);
