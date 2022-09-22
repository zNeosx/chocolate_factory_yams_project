import jwt from "jsonwebtoken";
import Joi from "joi";
import { UserModel } from "../models/User.js";
import crypto from "crypto-js";

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const schema = Joi.object({
    lastname: Joi.string().empty().messages({
      "string.empty": "Veuillez entrer un nom.",
    }),
    firstname: Joi.string().empty().messages({
      "string.empty": "Veuillez entrer un prénom.",
    }),
    email: Joi.string().empty().email().messages({
      "string.empty": "Veuillez entrer une adresse e-mail.",
      "string.email": "Veuillez entrer un email valide.",
    }),
    password: Joi.string().empty().min(4).messages({
      "string.empty": "Veuillez entrer un mot de passe.",
      "string.min": "Votre mot de passe doit contenir au minimum 4 caractères.",
    }),
    password_confirm: Joi.string().empty().min(4).messages({
      "string.empty": "Veuillez entrer un mot de passe.",
      "string.min": "Votre mot de passe doit contenir au minimum 4 caractères.",
    }),
  });
  try {
    await schema.validateAsync(req.body);
    const user = await UserModel.findOne({ email });

    if (user) {
      console.log("failed : ", "Cette adresse e-mail est déjà utilisée");
      res.status(400).json({
        success: false,
        message: "Cette adresse e-mail est déjà utilisée",
        form: {
          firstname,
          lastname,
        },
      });
    } else {
      const passHash = crypto.SHA1(password).toString();
      const user = await UserModel.create({
        firstname,
        lastname,
        email,
        password: passHash,
        role: "player",
      });
      await user.save();
      console.log("success : ", user);
      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().empty().email().messages({
      "string.empty": "Veuillez entrer une adresse e-mail.",
      "string.email": "Veuillez entrer un email valide.",
    }),
    password: Joi.string().empty().messages({
      "string.empty": "Veuillez entrer un mot de passe.",
    }),
  });
  try {
    await schema.validateAsync(req.body);
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("failed : ", "Cette adresse e-mail n'existe pas");
      res.status(400).json({
        success: false,
        message: "Cette adresse e-mail n'existe pas",
      });
    } else {
      const passHash = crypto.SHA1(password).toString();
      if (user.password === passHash) {
        console.log(user.role);
        const token = jwt.sign(
          {
            id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        console.log("success token created, user connected ");
        res.status(200).json({
          success: true,
          token,
        });
      } else {
        console.log("failed : ", "Mot de passe incorrect");
        res.status(400).json({
          success: false,
          message: "Mot de passe incorrect",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false, message: e.message });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Déconnecté !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
