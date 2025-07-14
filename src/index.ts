import { Probot, Context } from "probot"

import { processRequest } from "./controllers/application_controller/index.js"

export default (app: Probot) => {
  app.on("pull_request.opened", async (context: Context) => {
    processRequest({ context, event: "pull_request.opened" })
  })

  app.on("issues.opened", async (context: Context) => {
    processRequest({ context, event: "issues.opened" })
  })
}
