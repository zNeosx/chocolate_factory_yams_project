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
    const allPastries = await PastriesModel.find({ isDeleted: false });
    for (let i = 0; i < pastries; i++) {
      const randompastries = Math.floor(Math.random() * allPastries.length);
      const pastrieRandom = await PastriesModel.findOne({
        order: allPastries[randompastries].order,
      });
      const newPastrieWon = new PastriesWonModel({
        name: pastrieRandom.name,
        winnerName: req.user.lastname,
        winnerFirstname: req.user.firstname,
      });
      pastriesReward.push(pastrieRandom);
      await UserModel.findByIdAndUpdate(
        req.user.id,
        {
          $push: { pastries: pastrieRandom._id },
        },
        { new: true }
      );
      await newPastrieWon.save();
    }
    res.status(200).json({ pastries: pastriesReward });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getPastriesWon = async (_, res) => {
  try {
    const pastries = await PastriesWonModel.find();
    res.status(200).json({ pastries });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
export const getUserPastries = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).populate("pastries");
    res.status(200).json({ pastries: user.pastries });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
