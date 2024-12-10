const encryptor = require("simple-encryptor");

const en = encryptor.createEncryptor("1785cfc3bc6ac7738e8b38c");

const passwordHashed = async (password) => {
  try {
    const hasedPass = en.encrypt(password);
    return hasedPass;
  } catch (error) {
    console.log(error.message);
  }
};

const passwordCompare = async (hashedPass, pas) => {
  try {
    const isMatch = await en.decrypt(hashedPass);
    if (isMatch !== pas) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

const passwordDecryt = async (hashedPass) => {
  try {
    return await en.decrypt(hashedPass);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports =  { passwordHashed, passwordCompare, passwordDecryt };