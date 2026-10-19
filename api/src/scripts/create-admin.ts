/**
 * Creates an admin login, or gives an existing one a new password:
 *   npm run create-admin -- owner@example.com "Owner Name"
 * Prints a generated password once. The admin must choose their own password when they first log in.
 */
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { env } from '../env.ts';
import { tempPassword } from '../lib/auth.ts';
import { UserModel } from '../models.ts';

const [email, name] = process.argv.slice(2);
if (!email?.includes('@')) {
  console.error('Usage: npm run create-admin -- <email> "<name>"');
  process.exit(1);
}
await mongoose.connect(env.mongoUrl);
const password = tempPassword();
const passwordHash = await bcrypt.hash(password, 10);
const existing = await UserModel.findOne({ email: email.toLowerCase() });
if (existing) {
  existing.passwordHash = passwordHash;
  existing.mustChangePassword = true;
  existing.passwordChangedAt = new Date(); // signs out their other sessions
  if (name) existing.name = name;
  await existing.save();
} else {
  await UserModel.create({ email, name: name || email.split('@')[0], passwordHash, mustChangePassword: true });
}
console.log(`\n${existing ? 'New password for' : 'Admin login created for'} ${email}\nPassword: ${password}\n(They choose their own password when they first log in.)\n`);
await mongoose.disconnect();
