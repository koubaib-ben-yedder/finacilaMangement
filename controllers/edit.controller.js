const edit = require("../models/edit.model");
const user = require("../models/user.model");
const mongoose = require("mongoose");
const editUser = require("../models/editUser.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
exports.getEdit = async (req, res) => {
  try {
    //grap email and pasword from  client request
    const { email, password } = req;

    // grap user by email  for test email and password

    const userOne = await user.findOne({ email: email });

    //check if user is exist or not 

    if (!userOne) {
      console.log(email);
      //send error response if user doesn't exist 
      return res.statust(400).send({ msg: "email not found" });

    }

    // check if pzssword is coorect or not  by user 
    if (!bcryptjs.compareSync(password, userOne.password)) {
      return res.statust(400).send({ msg: "password in correct" });
    }

    const editUserAll = await editUser.find({ user: userOne.id });

 
    const editAll = await edit.find({});

    console.log(editAll);
    let editTable = [];

  
      editUserAll.map((el1) => {
        console.log("-------", el1.edit.toString());
        editAll.map((el2) => {
          console.log("-------", el2._id.toString());
          console.log(
            el1.edit.toString(),
            el2._id.toString(),
            el1.edit.toString() == el2._id.toString()
          );
          if (el1.edit.toString() == el2._id.toString()) {
            editTable = [...editTable, el2];
          }
        });
      });
      if(editTable.length!=0){
        return res.status(200).send(editTable );
      }
   
     else {
      return res.status(200).send({ msg: "edit is empty" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getOneEdit = async (req, res) => {
  try {
    const { id } = req.params;

    // check if id is valid or not

    if (!mongoose.Types.ObjectId.idValid(id)) {
      //get edit data

      const oneEdit = await edit.findOne({ _id: id });

      // test if edit esit or not

      if (!oneEdit) {
        return res.status(400).send({ msg: "name edit dosen't exist" });
      }

      return res.status(200).send(oneEdit );
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.deleteEdit = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      const editOne = await edit.findOne({ _id: id });

      console.log(editOne);

      if (!editId) {
        return res.status(400).send({ msg: "name edit dosen't exist" });
      }

      await edit.findByIdAndDelete(editOne._id);
      
      
      await editUser.findOneAndDelete({edit:editOne._id})





      return res.status(200).send({ msg: "deleat with suceess" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.addEdit = async (req, res) => {
  try {
    const { nameEdit } = req.body;

    const findOneEdit = await edit.findOne({ nameEdit: nameEdit });

    if (findOneEdit) {
      return res.status(400).send({ msg: "user exist aleardy" });
    }

    const addOneEdit = new edit(req.body);

    await addOneEdit.save();

    const findSecondeEdit = await edit.findOne({ nameEdit: nameEdit });
    console.log(findSecondeEdit);
    const { email, password } = req;

    console.log(email);

    const userOne = await user.findOne({ email: email });

    if (!userOne) {
      return res.statust(400).send({ msg: "email not found" });
    }

    if (!bcryptjs.compareSync(password, userOne.password)) {
      return res.statust(400).send({ msg: "password in correct" });
    }

    console.log("--", userOne, findSecondeEdit);

    const addEditUser = new editUser({
      edit: findSecondeEdit._id,
      user: userOne._id,
    });

    await addEditUser.save();

    return res.status(200).send({ msg: "data added witch sucess" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.updateEdit = async (req, res) => {
  try {
    const { nameEdit } = req.body;

    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id) == true) {
      const editOne = await edit.findOne({ _id: id });

      if (!editOne) {
        return res.status(400).send({ msg: "id dosen't exist" });
      }

      const updateOne = await edit.findByIdAndUpdate(id, {
        $set: { nameEdit: nameEdit },
      });

      return res.status(200).send({ msg: "edit update with sucess" });
    }

    return res.status(400).send({ msg: "id give invalide" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
