import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: uploadRouter
})