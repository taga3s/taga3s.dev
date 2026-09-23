import { Hono } from "hono";
import type { ContextSet } from "../../index";
import { imagesRoutes } from "./images";

export const resourcesRoutes = new Hono<ContextSet>();

resourcesRoutes.route("/images", imagesRoutes);
