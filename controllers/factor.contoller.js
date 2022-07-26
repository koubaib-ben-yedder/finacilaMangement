const factor = require("../models/factor.model");
const mongoose = require("mongoose");
const factorUser = require("../models/factorUser.model");
const role = require("../models/role.model");
const user = require("../models/user.model");
const bcryptjs = require("bcryptjs");
exports.getFactor = async (req, res) => {
  try {
    
    

    const { password, email } = req;
 
    const userOne = await user.findOne({ email: email });

    if (!userOne) {
      return resstatus(400).send({ msg: "email not found" });
    }

    if (!bcryptjs.compareSync(password, userOne.password)) {
      return res.status(400).send({ msg: "password incorrect" });
    }

    const userFactorAll = await factorUser.find({ user: userOne._id });

    const factorAll = await factor.find();

    let factorTable = [];

  

      userFactorAll.map((el1) => {
        factorAll.map((el2) => {
          console.log(
            el1.user.toString(),
            el2._id.toString(),
            el1.user.toString() == el2._id.toString()
          );
          if (el1.factor.toString() == el2._id.toString()) {
            factorTable = [...factorTable, el2];
          }
        });
      });

      if(factorTable.length!=0){
        return res.status(200).send(factorTable );
      
     
    }else{
      return res.status(200).send({msg:"factor is empty"})
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
        return res.status(200).send(oneFactor );
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

    console.log(id);

    if (mongoose.Types.ObjectId.isValid(id)) {
      const factorOne = await factor.findOne({ _id: id });

      if (!factorOne) {
        return res.status(400).send({ msg: "id dont exist" });
      }

      await factor.findByIdAndDelete(id);
      
      await factorUser.findOneAndDelete({factor:id})

      return res.status(200).send({ msg: "delete with sucess" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.addFactor = async (req, res) => {
  try {
    
    console.log(req.file)
    
    const factorAdd = new factor({ ...req.body,imageFactor:"" });
    console.log("--");
    await factorAdd.save();

    const { password, email } = req;

    console.log("--");

    const factorId = await (await factor.find()).reverse()[0];

    const userOne = await user.findOne({ email: email });

    if (!userOne) {
      return res.status(400).send({ msg: "email not found" });
    }

    if (!bcryptjs.compareSync(password, userOne.password)) {
      return res.status(400).send({ msg: "password incorrect" });
    }

    console.log(userOne);

    const factorUserAdd = await factorUser({
      factor: factorId._id,
      user: userOne._id,
    });

    await factorUserAdd.save();

    return res.status(200).send({ msg: "data added with sucess" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.updateFactor = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("--", id, req.body);
    if (mongoose.Types.ObjectId.isValid(id)) {
      const factorOne = await factor.findOne({ _id: id });

      if (!factorOne) {
        return res.status(400).send({ msg: "id dosen't exist" });
      }

      const factorUpdate = await factor.findByIdAndUpdate(id, {
        $set: req.body,
      });

      return res.status(200).send({ msg: "factor update with sucess" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
