const db = require("./database.cjs");
const express = require("express");
const morgan = require("morgan");
const create = require("./routes/create-contact.cjs");
const read = require("./routes/read-contact.cjs");
const update = require("./routes/update-contact.cjs");
const updatemsg = require("./routes/update-messages.cjs");
const rep = require("./routes/repertoire.cjs");
const del = require("./routes/delete-contact.cjs");
const msg = require("./routes/messages.cjs");

const readmsg = require("./routes/read-messages.cjs")
const deletemsg = require("./routes/delete-messages.cjs")

const readmsgid = require("./routes/read-messages-by-id.cjs");


const app = express();

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/create-contact", create);
app.use("/read-contact", read);
app.use("/update-contact", update);
app.use("/delete-contact", del);
app.use("/repertoire", rep);
app.use("/messages", msg);
app.use("/read-messages", readmsg);
app.use("/delete-messages", deletemsg);
app.use("/update-messages", updatemsg);
app.use("/read-messages-by-id", readmsgid);


app.get("/", async (req, res) => {
  const query = `
    SELECT * FROM contact
    ORDER BY id;
    `;
  const { rows } = await db.query(query);
  res.render("index", { item: rows });
});

app.get("/contact", async (req, res) => {
  const query = `
    SELECT * FROM contact
    ORDER BY id;
    `;
  const { rows } = await db.query(query);
  res.json(rows);
});

app.listen(3000, () => {
  console.log("At port 3000");
});
