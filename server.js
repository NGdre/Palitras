const app = require("./src/app");
const mongoose = require("mongoose");
const IN_PROD = process.env.NODE_ENV === "production";

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("mongoDB is successfully connected"))
  .catch(err => console.log("mongoDB", err));

const { PORT } = process.env;

app.listen(PORT, () =>
  console.log(`server runs on ${process.env.HOST}${PORT}`)
);
