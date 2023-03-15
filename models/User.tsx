import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const ROLES = ['buyer', 'seller', 'admin'];
export interface HookNextFunction {
  (error?: Error): any;
}

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next: HookNextFunction) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(+process.env.SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((e: any) => false);
};

export default mongoose.models.User ||
  mongoose.model<UserDocument>('User', userSchema);
