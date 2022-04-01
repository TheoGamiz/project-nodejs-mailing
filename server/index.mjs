import router from "./routes.mjs"
import express from "express"
import bodyparser from "body-parser";
import morgan from "morgan"
import swaggerUI from "swagger-ui-express";
import docs from "./docs/index.mjs";

const port = 3000;
const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(morgan('tiny'))
app.use("/swager", swaggerUI.serve, swaggerUI.setup(docs));


app.use(router)


//ok
app.listen(port, () => {
  console.log(`server listening on port:  ${port}`)
})



export default {}