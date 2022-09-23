import { getDiceRoll, getDicesOccurrences } from "../utils/index.js";
import { PastriesWonModel } from "../models/PastriesWon.js";

export const getGameStatus = async (_, res) => {
  try {
    const pastriesWonCount = await PastriesWonModel.count();
    if (pastriesWonCount < 50) {
      res.status(200).json({ status: "active", count: pastriesWonCount });
    } else {
      res.status(200).json({ status: "inactive", count: pastriesWonCount });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCombination = async (req, res) => {
  let result = {
    success: false,
    combination: "Pas de combinaison gagnantes",
    message: "Dommage, réessayez plus tard !",
  };

  // Lancement des dés
  const dices = getDiceRoll();

  // Récupérer les occurrences
  const occurrences = getDicesOccurrences(dices);

  // Filtrer les combinaisons gagnantes
  const [carre] = Object.entries(occurrences).filter((occ) => occ[1] === 4);
  const double = Object.entries(occurrences).filter((occ) => occ[1] === 2);
  const [yams] = Object.entries(occurrences).filter((occ) => occ[1] === 5);

  if (carre) {
    result = {
      success: true,
      combination: `Carré de ${carre[0]}`,
      message: "Félicitations ! T'as gagné 2 pâtisseries !",
      pastries: 2,
    };
  }
  if (double.length === 2) {
    result = {
      success: true,
      combination: `Double de ${double[0][0]} et ${double[1][0]}`,
      message: "Félicitations ! T'as gagné 1 pâtisserie !",
      pastries: 1,
    };
  }
  if (yams) {
    result = {
      success: true,
      combination: `Yams de ${yams[0]}`,
      message: "Félicitations ! T'as gagné 3 pâtisserie !",
      pastries: 3,
    };
  }
  const userGameState = await PastriesWonModel.findOne({ userId: req.user.id });
  if (!userGameState) {
    const newUserGameState = new PastriesWonModel({
      userId: req.user.id,
    });
    await newUserGameState.save();
  }
  res.status(200).json({ dices, result });
};
