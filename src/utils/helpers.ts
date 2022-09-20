import * as bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(plainPassword, salt);
}

export async function compareHash(
  plainPassword: string,
  hashedPassword: string,
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
