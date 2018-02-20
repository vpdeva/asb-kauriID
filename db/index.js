const { userModel, chitModel } = require('./model');
const CRUD = require('./basic');

const validationError = "ValidationError";

const userService = new CRUD(userModel);
const chitService = new CRUD(chitModel);

function validateError(err) {
    if (err.name === validationError)
        return { result: null, isValid: false, isError: true }
    else
        return { isError: true }
}

function addNewUser({ name, address }) {
    let user = {
        name: name,
        address: address
    }
    return userService.create(user)
        .then(res => ({ result: res.result, isValid: true, isError: false }))
        .catch(err => validateError(err))
}

function findUser(queryParams = {}) {
    return userService.find(queryParams)
        .then(res => ({ result: res, isError: false }))
        .catch(err => ({ isError: true }) )
}

function updateUser(address, newRecords) {
    let condition = { address: address };
    return userService.update(condition, newRecords)
        .then(res => ({ result: res.result, isValid: true, isError: false }))
        .catch(err => validateError(err));
}

function removeUser(address) {
    return userService.remove();
}

function removeMultipleUsers() {

}

function createNewChit(userAddress, name, startDate, period, amount_per_sme) {
    let record = {
        user: userAddress,
        name: name,
        start_date: startDate,
        period: period
    }
    return chitService.create(record)
}

module.exports = {
    addUser: addNewUser,
    findUser: findUser,
    updateUser: updateUser,
    removeUser: removeUser,
    removeManyUsers: removeMultipleUsers
};
