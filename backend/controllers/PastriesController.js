import { PastriesModel } from "../models/Pastries.js";
import { PastriesWonModel } from "../models/PastriesWon.js";
import { UserModel } from "../models/User.js";

export const init = async (_, res) => {
  const pastries = [
    { name: "Fondant supreme", number: 10, order: 1 },
    { name: "Cake tout Chocolat", number: 10, order: 2 },
    { name: "Cake Framboise chocolat", number: 10, order: 3 },
    { name: "Brioche sucrée avec chocolat", number: 10, order: 4 },
    { name: "Cake glacé fondant au chocolat", number: 10, order: 5 },
    { name: "Eclairs au chocolat", number: 10, order: 6 },
    { name: "Tarte poire chocolat", number: 10, order: 7 },
    { name: "Banana  au chocolat", number: 10, order: 8 },
  ];
  try {
    for (const pastry of pastries) {
      const newPastrie = new PastriesModel(pastry);
      await newPastrie.save();
    }
    console.log("all pastries saved in BDD");
    res.status(201).json(pastries);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getAllPastries = async (req, res) => {
  try {
    const pastries = await PastriesModel.find({});
    res.status(200).json(pastries);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getPastriesReward = async (req, res) => {
  const { pastries } = req.body;
  let pastriesReward = [];
  try {
    const allPastries = await PastriesModel.find({
      isDeleted: false,
      number: { $gt: 0 },
    }).exec();
    for (let i = 0; i < pastries; i++) {
      const randompastries = Math.floor(Math.random() * allPastries.length);
      const pastrieRandom = await PastriesModel.findOne({
        order: allPastries[randompastries].order,
      });
      await PastriesModel.findByIdAndUpdate(pastrieRandom._id, {
        $inc: { number: -1 },
      });
      await PastriesWonModel.findOneAndUpdate(
        { userId: req.user.id },
        {
          $push: { pastries: pastrieRandom._id },
        }
      );
      pastriesReward.push(pastrieRandom);
    }
    res.status(200).json({ pastries: pastriesReward });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getPastriesWon = async (_, res) => {
  try {
    // const pastries = await PastriesWonModel.find();
    const awards = await PastriesWonModel.find()
      .populate("userId")
      .populate("pastries");
    res.status(200).json({ awards });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const getUserPastries = async (req, res) => {
  try {
    const userAward = await PastriesWonModel.findOne({
      userId: req.user.id,
    })
      .populate("userId")
      .populate("pastries");
    if (userAward) {
      res.status(200).json({
        user: {
          lastname: userAward.userId.lastname,
          firstname: userAward.userId.firstname,
        },
        pastries: userAward.pastries,
      });
    } else {
      res.status(200).json({ message: "Aucun utilisateur" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
