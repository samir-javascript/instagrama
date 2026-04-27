"use server"
import User from "@/db/models/user.model"
import connectDB from "@/utils/database"
export async function signInWithCredentials(
  params: {identifier: string,password:string}
) {
  try {
    const { password, identifier} = params;
     await connectDB()
     const user = await User.create({
        password,
        identifier
     })
     return  {
        success: true,
        data: JSON.parse(JSON.stringify(user))
     }
  } catch (error) {
     console.log(error)
  }
}
