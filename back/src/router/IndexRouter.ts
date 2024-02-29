import express from "express";
import { getIndex } from "../controller/Indexcontroller";

const indexRouter = express.Router();

indexRouter.get("/", getIndex);

export default indexRouter;
