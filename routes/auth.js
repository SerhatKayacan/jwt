const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

//REGISTER
//  api/user/register  POST request
router.post("/register", async (req, res) => {
  //VALIDATE THE DATA BEFORE WE MAKE A USER
  const { error } = registerValidation(req.body); //req.body'deki data(obje), registerValidation schema'ya uymazsa
  if (error) return res.status(400).send(error.details[0].message); // response olarak hatayı dön

  //check if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt); // password'u şifreler(karmaşık hale getirir)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save(); // mongoDB'ye kaydet
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body); //req.body'deki data(obje), loginValidation schema'ya uymazsa
  if (error) return res.status(400).send(error.details[0].message); // response olarak hatayı dön

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesnt exist");

  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  //
  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
