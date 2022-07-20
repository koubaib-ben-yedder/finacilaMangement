const client = require("../models/client.model");
const role = require("../models/role.model");
const clientUser = require("../models/clientUser.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const bcryptjs = require("bcryptjs");
exports.getClient = async (req, res) => {
  try {
    //grap authorization token from request to give a personalization data depend of token
    const { email, password } = req;
    //extract email from authorization token and test if is valid email adress and ectract passsword for testing

    //grap user password from user collection for test her validation

    const userOne = await user.findOne({ email: email });

    //check if user password is valid or not

    if (!bcryptjs.compareSync(password, userOne.password)) {
      //send error message to fontend if password is incorrect
      return res.status(400).send({ msg: "password is incorrect" });
    }

    //check if email is valid or not
    if (!userOne) {
      //send error messsage to the frontend if email not
      return res.status(400).send({ msg: "email not found" });
    }

    //grap  client data by user id

    const clientUserAll = await clientUser.find({ user: userOne._id });

    //grap client to be filtred by client id
    const clientAll = await client.find();

    console.log(clientUserAll, clientAll);

    let clientTable = [];

    //test  if have relaction or not

  
      clientUserAll.map((el1) => {
        clientAll.map((el2) => {
          console.log(el1.client.toString() == el2._id.toString());

          if (el1.client.toString() == el2._id.toString()) {
            clientTable = [...clientTable, el2];
          }
        });
      });

      console.log(clientTable);

      // test if you have a client or not

      
      // test if data exist before sending
      if(clientTable.length!=0){
          // send data to the frontend
        return res.status(200).send(clientTable);
      }
      else {
      //send error message to the fontend

      return res.status(400).send({ msg: "client is empty" });
    }
  } catch (error) {
    //send a server error message
    return res.status(500).send(error);
  }
};

exports.getOneClient = async (req, res) => {
  try {
    //grap id from client request
    const { id } = req.params;

    //check if id exit in data base or not

    if (mongoose.Types.ObjectId.isValid(id)) {
      //grap client data by id give it

      const oneclient = await client.findOne({ _id: id });

      // test if client exist or not
      if (oneclient) {
        //send data to the frontend
        return res.status(200).send(oneclient);
      }
    }
    //send error message if id dosen't exist

    return res.status(400).send({ msg: "id dont exist" });
  } catch (error) {
    //send server  error message to the frontend
    return res.status(500).send(error);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    //grap id from client request
    const { id } = req.params;

    //test if id is valid or not

    if (mongoose.Types.ObjectId.isValid(id)) {
      //delete by id client

      await client.findByIdAndDelete(id);
      //delete relaction by id client

      await clientUser.findOneAndDelete({ client: id });

      //send a validation message to the fontend

      return res.status(200).send({ msg: "client deleted with sucess" });
    }
  } catch (error) {
    // send a server error message
    return res.status(500).send(error);
  }
};

exports.updateClient = async (req, res) => {
  try {
    console.log("--");
    //grap id from client request

    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      // update clinet by id
      await client.updateOne({ _id: id }, req.body);
      // send a validation message to fontend

      return res.status(200).send({ msg: "update with sucess" });
    }
  } catch (error) {
    // send a validation error message to the frontend
    return res.status(500).send(error);
  }
};

exports.addClient = async (req, res) => {
  try {
    console.log(req.body);

    // grap email and password  from request client
    const { email, password } = req;

    console.log(email);
    // grap user data by email for test if user exist **

    const userOne = await user.findOne({ email: email });

    //test if user exist or

    if (!userOne) {
      //send a error message to the frontend

      return res.statust(400).send({ msg: "email not found" });
    }
    //compare password  from a client request to user password already save it in datebase if user exist

    if (!bcryptjs.compareSync(password, userOne.password)) {
      // send a error message to the frontend

      return res.status(400).send({ msg: "password is incorrect" });
    }
    // save data to client document

    const addclientData = new client(req.body);

    //conform save data to client document

    await addclientData.save();
    // take the first collection

    const clientId = (await client.find()).reverse()[0];
    console.log("---");
    // make a relaction
    const clientUserAdd = new clientUser({
      client: clientId._id,
      user: userOne._id,
    });
    // confrom save data to client document

    await clientUserAdd.save();
    //send a validation message to the frontend
    return res.status(200).send({ msg: "client addes with sucees" });
  } catch (error) {
    //send a  server error message to the frontend
    return res.status(500).send(error);
  }
};
