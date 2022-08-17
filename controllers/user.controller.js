const user = require("../models/user.model");
const role = require("../models/role.model");
const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const incomeUser = require("../models/incomeUser.model");
const income = require("../models/income.model");
const edit = require("../models/edit.model");
const editUser = require("../models/editUser.model");
const client = require("../models/client.model");
const clientUser = require("../models/clientUser.model");
const factor = require("../models/factor.model");
const factorUser = require("../models/factorUser.model");
exports.getOneUser = async (req, res) => {
  try {
    const { email } = req;
    const getUserData = await user.findOne({ email: email }).select("-createdAt").select("-updatedAt");

    console.log("1")
    if (!getUserData) {
      return res
        .status(400)
        .send({ msg: "you email not correct or you dont have account" });
    }

    return res.status(200).send(getUserData);
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.getUser = async (req, res) => {
  try {
    const { email } = req;
    const getUserData = await user.findOne({ email: email }).select("-createdAt").select("-updatedAt");
    const roleOne = await role.findOne({ _id: getUserData.role });

    if (!getUserData) {
      return res
        .status(400)
        .send({ msg: "you email not correct or you dont have account" });
    }

    if (roleOne.role == "Admin") {
      const getAllUsers = await user.find().select("-createdAt").select("-updatedAt");

      return res.status(200).send(getAllUsers);
    }
    return res.status(200).send(getAllUsers);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req;

    const userOne = await user.findOne({ email: email });
    
    if (!userOne){

        return res.status(400).send({msg:"user dosent exit"})
    }

    const userIncomeAll = await incomeUser.find({ user: userOne._id });

    if (userIncomeAll.length != 0) {
      userIncomeAll.map(async (el) => {
        await income.findOneAndDelete({ _id: el.income });
      });
    }

    await incomeUser.deleteMany({ user: userOne._id });

    const userFactorALL = await factorUser.find({ user: userOne._id });

    if (userFactorALL.length != 0) {
      userFactorALL.map(async (el) => {
        await factor.findOneAndDelete({ _id: el.factor });
      });
    }

    await factorUser.deleteMany({ user: userOne._id });

    const userEditAll = await editUser.find({ user: userOne._id });

    if (userEditAll.length != 0) {
      userEditAll.map(async (el) => {
        await edit.findOneAndDelete({ _id: el.edit });
      });
    }

    await editUser.deleteMany({ user: userOne._id });

    const userClientAll = await clientUser.find({ user: userOne._id });

    if (userClientAll.length != 0) {
      userClientAll.map(async (el) => {
        await client.findOneAndDelete({ _id: el.client });
      });
    }
    await clientUser.deleteMany({ user: userOne._id });

    await user.findOneAndDelete({ email: email });

    return res.status(200).send({ msg: "delete with sucess" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email } = req;

    const { password } = req.body;

    const userOne = await user.findOne({ email: email });

    if (!userOne) {
      return res.status(400).send({ msg: "email dosen't exist" });
    }

    await user.findOneAndUpdate(
      { email: email },
      { $set: { ...req.body, password: bycryptjs.hashSync(password, 10) } }
    );

    return res.status(200).send({ msg: "update with sucess" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.addUser = async (req, res) => {
  try {
    const { password, email } = req.body;

    const roleToTest = req.body.role;

    const userOne = await user.findOne({ email: email });

    if (userOne) {
      return res.status(400).send({ msg: "email exist" });
    }
    console.log("1");

    const roleUser = await role.findOne({ role: roleToTest });

    console.log("2");
    console.log(roleUser);

    const addUserData = new user({
      ...req.body,
      password: bycryptjs.hashSync(password, 10),
      role: roleUser._id,
    });

    await addUserData.save();

    return res.status(200).send({ msg: "user added with sucess" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await user.findOne({ email: email });

    if (!userData) {
      return res.status(400).send({ msg: "email dosen't exist" });
    }

    if (!bycryptjs.compareSync(password, userData.password)) {
      return res.status(400).send({ msg: "password incorrect" });
    }

    const webtoken = jwt.sign({ email, password }, process.env.WEB_TOKEN_KEY);

    return res.status(200).send({ webtoken: webtoken });
  } catch (error) {
    return res.status(500).send(error);
  }
};
