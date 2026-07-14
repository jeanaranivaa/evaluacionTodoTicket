import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"

import { config } from "../../config.js"

import adminModel from "../models/admin.js"

const loginAdminController = {};

loginAdminController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminFound = await adminModel.findOne({ email });

        if (!adminFound) {
            return res.status(400).json({ message: "Admin already exists" })
        }

        if (adminFound.timeOut && adminFound.timeOut > Date.now()) {
            return res.status(403).json({ message: "Blocked account" })
        }

        const isMatch = await bcrypt.compare(password, adminFound.password);

        if (!isMatch) {
            adminFound.loginAttempts = (adminFound.loginAttempts || 0) + 1;

            if (adminFound.loginAttempts >= 5) {
                adminFound.timeOut = Date.now() + 5 * 60 * 1000;
                adminFound.loginAttempts = 0;

                await adminFound.save();

                return res
                    .status(403)
                    .json({ message: "Blocked account for many attempts" });
            }

            await adminFound.save();

            return res.status(401).json({ message: "Wrong password" });
        }

        adminFound.loginAttempts = 0;
        adminFound.timeOut = null;

        const token = jsonwebtoken.sign(
            {id: adminFound._id, userType: "admin"},
            config.JWT.secret,
            { expiresIn: "30d"},
        );

        res.cookie("authCookie", token);

        return res.status(200).json({message: "Login successfully"});
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
};

export default loginAdminController;