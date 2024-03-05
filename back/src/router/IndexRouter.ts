import express from "express";
import { getIndex } from "../controller/IndexController";

const indexRouter = express.Router();

indexRouter.get("/", getIndex);

export default indexRouter;
