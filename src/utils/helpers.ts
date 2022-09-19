import * as bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(plainPassword, salt);
}
