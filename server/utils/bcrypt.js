import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const bcriptPwd = {
  encrypt: (pwd) => bcrypt.hashSync(pwd, salt),
  decipher: (enteredPwd, currentPwd) => bcrypt.compareSync(enteredPwd, currentPwd),
};
