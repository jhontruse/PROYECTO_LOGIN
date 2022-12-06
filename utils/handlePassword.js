const bcryptjs = require("bcryptjs");
const authConfig = require("../auth/auth");

const encrypt = async (passwordEncrypt) => {
  const hash = await bcryptjs.hashSync(
    passwordEncrypt,
    Number.parseInt(authConfig.rounds)
  );
  return hash;
};

const compare = async (passwordEncrypt, hashPassword) => {
  return await bcryptjs.compare(passwordEncrypt, hashPassword);
};

module.exports = { encrypt, compare };
