import UserAccount from "../models/userAccount.model.js";
import * as userAccountRepository from "./userAccount.repositories.js";

export const addUser = async (user) => UserAccount.create(user)

export const removeUser = async (login) => UserAccount.findByIdAndDelete(login, {returnDocument:'after'}).exec();

export const updateUser = async (login, updateData) => UserAccount.findByIdAndUpdate(login, updateData, {returnDocument: 'after'}).exec();

export const getUser = async (login) => UserAccount.findById(login,{returnDocument:'after'}).exec();