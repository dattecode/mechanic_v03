import bcrypt from "bcrypt"

 export const encrypterPassword = async (pass) =>{
  const saltRound = 12
  const salt = await bcrypt.genSalt(saltRound)
  return await bcrypt.hash(pass, salt)
 }