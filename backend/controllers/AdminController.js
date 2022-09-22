import jwt from "jsonwebtoken";
import { PastriesModel } from "../models/Pastries.js";
import { PastriesWonModel } from "../models/PastriesWon.js";
import { UserModel } from "../models/User.js";

export const adminlogin = async (req, res) => {
  try {
    const { password } = req.body;
    if (password === "adminpwd") {
      const adminToken = jwt.sign(
        { role: "admin", name: "ADMIN" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      req.session.adminToken = adminToken;
      res.status(201).json({ adminToken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deletePastrie = async (req, res) => {
  try {
    const { id } = req.params;
    // const users = await UserModel.find({ pastries: id });
    // users.forEach(async (user) => {
    //   user.pastries = user.pastries.filter((pastrie) => pastrie != id);
    //   await user.save();
    // });
    // const pastryToDelete = await PastriesModel.findById(id);
    // const pastryWonDeleted = await PastriesWonModel.deleteMany({
    //   name: pastryToDelete.name,
    // });
    const pastryDeleted = await PastriesModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    res.status(200).json({
      pastryDeleted,
      message: `La pâtisserie '${pastryDeleted.name}' a été supprimée avec succès.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const restorePastry = async (req, res) => {
  try {
    const { id } = req.params;
    const pastryRestored = await PastriesModel.findByIdAndUpdate(id, {
      isDeleted: false,
    });
    res.status(200).json({
      pastryRestored,
      message: `La pâtisserie '${pastryRestored.name}' a été restaurée avec succès.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const addPastry = async (req, res) => {
  try {
    const { name, number } = req.body;
    const pastriesCount = await PastriesModel.count();
    const newPastry = new PastriesModel({
      name,
      number,
      order: pastriesCount + 1,
    });
    await newPastry.save();
    res.status(201).json({
      newPastry,
      message: `La pâtisserie "${name}" a bien été ajoutée !`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
