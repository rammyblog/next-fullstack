import dbConnect from '../../../../config/connectDb';
import User from '../../../../models/User';
import {
  RegisterSchemaType,
  registerSchema,
} from '../../../../schema/user.schema';

export async function POST(req: Request) {
  await dbConnect();
  const body: RegisterSchemaType = await req.json();
  try {
    registerSchema.parse(body);
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return new Response('user already exist', { status: 400 });
    }
    const user = await User.create(body);
    return new Response(user, { status: 201 });
  } catch (error: any) {
    return new Response(error, { status: 400 });
  }
}
