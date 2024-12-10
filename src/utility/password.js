const argon2 = require("argon2")

const passwordHash = async(password)=>{
    try{
    const passwordHash = await argon2.hash(password)
    return passwordHash;
    }
    catch(error)
    {
        console.log(error)
    }
}

const passwordCompare = async (hashedPass,password)=>{
    try {
        const isMatch = argon2.verify(hashedPass,password);
    return isMatch;
    } catch (error) {
        console.error(error.message)
        console.log(error)
    }
}

module.exports = {
    passwordCompare,
    passwordHash
}