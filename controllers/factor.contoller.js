const factor = require("../models/factor.model");
const mongoose = require("mongoose");
const factorUser = require("../models/factorUser.model");
const role = require("../models/role.model");
const user = require("../models/user.model");
const bcryptjs = require("bcryptjs");

exports.getFactor = async (req, res) => {
  try {
    const { password, email } = req;
    const { pageNumber } = req.params;

    const userOne = await user.findOne({ email: email });

    if (!userOne) {
      return resstatus(400).send({ msg: "email not found" });
    }

    if (!bcryptjs.compareSync(password, userOne.password)) {
      return res.status(400).send({ msg: "password incorrect" });
    }

    const factorOneRole = await role.findOne({ _id: userOne.role });

    if (factorOneRole.role.includes("User")) {
      const userFactorAll = await factorUser.find({ user: userOne._id });

      const factorAll = await factor
        .find()
        .select("-createdAt")
        .select("-updatedAt");

      let factorTable = [];

      userFactorAll.map((el1) => {
        factorAll.map((el2) => {
          if (el1.factor.toString() == el2._id.toString()) {
            factorTable = [...factorTable, el2];
          }
        });
      });

      let sliceToDisplay = [];
      if (factorTable.length != 0) {
        if (pageNumber == 1) {
          factorTable.map((el, index) => {
            if (0 <= index && index <= 9) {
              sliceToDisplay = [...sliceToDisplay, el];
            }
          });
        } else {
          factorTable.map((el, index) => {
            if (
              (pageNumber - 1) * 10 + 1 <= index &&
              index <= 10 * pageNumber
            ) {
              sliceToDisplay = [...sliceToDisplay, el];
            }
          });
        }

        return res.status(200).send(sliceToDisplay);
      } else {
        return res.status(400).send({ msg: "factor is empty" });
      }
    } else {
      const factorOne = await factor
        .find()
        .select("-createdAt")
        .select("-updatedAt");

      if (factorOne.length != 0) {
        // send data to the frontend
        let sliceToDisplay = [];

        if (pageNumber == 1) {
          factorOne.map((el, index) => {
            if (0 <= index && index <= 9) {
              sliceToDisplay = [...sliceToDisplay, el];
            }
          });
        } else {
          factorOne.map((el, index) => {
            if (
              (pageNumber - 1) * 10 + 1 <= index &&
              index <= 10 * pageNumber
            ) {
              sliceToDisplay = [...sliceToDisplay, el];
            }
          });
        }

        return res.status(200).send(sliceToDisplay);
      } else {
        //send error message to the fontend server

        return res.status(200).send({ msg: "Factor is empty" });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getOneFactor = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const oneFactor = await factor.findOne({ _id: id });

      if (oneFactor) {
        return res.status(200).send(oneFactor);
      }
    }
    return res.status(400).send({ msg: "id give dont exist" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.deleteFactor = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const factorOne = await factor.findOne({ _id: id });

      if (!factorOne) {
        return res.status(400).send({ msg: "id dont exist" });
      }

      await factor.findByIdAndDelete(id);

      await factorUser.findOneAndDelete({ factor: id });

      return res.status(200).send({ msg: "delete with sucess" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.addFactor = async (req, res) => {
  try {
    const factorAdd = new factor({
      ...req.body,
      imageFactor: String(req.file.originalname),
    });

    await factorAdd.save();

    const { password, email } = req;

    const factorId = await (await factor.find()).reverse()[0];

    const userOne = await user.findOne({ email: email });

    if (!userOne) {
      return res.status(400).send({ msg: "email not found" });
    }

    if (!bcryptjs.compareSync(password, userOne.password)) {
      return res.status(400).send({ msg: "password incorrect" });
    }

    const factorUserAdd = await factorUser({
      factor: factorId._id,
      user: userOne._id,
    });

    await factorUserAdd.save();

    return res.status(200).send({ msg: "data aded with succes" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.updateFactor = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const factorOne = await factor.findOne({ _id: id });

      if (!factorOne) {
        return res.status(400).send({ msg: "id dosen't exist" });
      }

      await factor.findByIdAndUpdate(id, {
        $set: { ...req.body, imageFactor: String(req.file.originalname) },
      });

      return res.status(200).send({ msg: "factor update with sucess" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

