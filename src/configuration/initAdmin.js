import UserAccount from "../models/userAccount.model.js";
import {ADMIN, MODERATOR, USER} from "./constants.js";

export const createAdmin = async () => {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        throw new Error('ADMIN_PASSWORD environment variable is not set');
    }

    let admin = await UserAccount.findById('admin').exec();

    if (!admin) {
        admin = new UserAccount({
            login: 'admin',
            password: adminPassword,
            firstName: 'Admin',
            lastName: 'Admin',
            roles: [USER, MODERATOR, ADMIN]
        });

        await admin.save();
    }
};