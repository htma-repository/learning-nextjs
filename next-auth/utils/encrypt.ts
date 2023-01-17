import bcrypt, { compare } from "bcrypt";

const saltRounds = 10;
export async function encryptPass(password: string) {
  const hashPass = await bcrypt.hash(password, saltRounds);
  return hashPass;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const compareCrypt = await compare(password, hashedPassword);
  return compareCrypt;
}
