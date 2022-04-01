import router from "./routes.mjs"
import express from "express"
import bodyparser from "body-parser";
import morgan from "morgan"

const port = 3011;
const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(morgan('tiny'))

app.use(router)

app.listen(port, () => {
  console.log(`server listen at ${port}`)
})



