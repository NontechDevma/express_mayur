import express from "express";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
let User = [];
let numberUser = 1;

// get all user
app.get("/", (req, res) => {
  if (!User.length) {
    res.send("Users are not available.");
  }
  res.status(200).send(User);
});

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});

// show files
app.use(express.static("public"));

// add new user
app.post("/register", (req, res) => {
  const { name, contact } = req.body;
  const newUser = { id: numberUser, name, contact };
  User.push(newUser);
  numberUser++;
  res.status(201).send(newUser);
});

// search user
app.get("/user/:id", (req, res) => {
  const user = User.find((userid) => userid.id == req.params.id);
  if (!user) {
    return res.status(404).send("oh ! User Not Found");
  }
  res.status(200).send(user);
});

//update user

app.put("/user/:id", (req, res) => {
  const user = User.find((userid) => userid.id == req.params.id);
  if (!user) {
    return res.status(404).send("oh ! User Not Found");
  }
  const { name, contact } = req.body;
  user.name = name;
  user.contact = contact;

  res.status(201).send(user);
});

// delete user

app.delete("/user/:id", (req, res) => {
  const deletedUser = User.filter((delUser) => delUser.id == req.params.id);
  if (deletedUser.length) {
    User = User.filter((delUser) => delUser.id != req.params.id);
    res.status(201).send("User Deleted successfully");
  } else {
    res.status(404).send("User Not Found");
  }
});
