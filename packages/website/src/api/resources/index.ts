import { Hono } from "hono";
import { ContextSet } from "../../type";
import { imagesRoutes } from "./images";

export const resourcesRoutes = new Hono<ContextSet>();

resourcesRoutes.route("/images", imagesRoutes);
