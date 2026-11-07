import UserAccount from '../models/userAccount.model.js';

export const addUser = async (user) => UserAccount.create(user);

export const removeUser = async (login) => UserAccount.findByIdAndDelete(login, {returnDocument: 'after'}).exec();

export const updateUser = async (login, updateData) => {
    const {firstName, lastName} = updateData;
    const allowedUpdates = {};
    if (firstName !== undefined) {
        allowedUpdates.firstName = firstName;
    }
    if (lastName !== undefined) {
        allowedUpdates.lastName = lastName;
    }
    return UserAccount.findByIdAndUpdate(
        login,
        {$set: allowedUpdates},
        {returnDocument: 'after', runValidators: true}
    ).exec();
}

export const findUser = async (login) => UserAccount.findById(login).exec();

export const addRole = async (login, role) => UserAccount.findByIdAndUpdate(login,{$addToSet: {roles: role}}, {returnDocument: 'after'}).select({roles: 1, login: 1}).exec();

export const removeRole = async (login, role) => UserAccount.findByIdAndUpdate(login,{$pull: {roles: role}}, {returnDocument: 'after'}).select('-firstName -lastName').exec();

export const changePassword = async (login, newPassword) => {
    const userAccount = await UserAccount.findById(login).exec();
    if (!userAccount) {
        return null;
    }
    userAccount.password = newPassword;
    return userAccount.save();
}