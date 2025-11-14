import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/dist/server/api-utils";


export const requiredUser= async ()=>{
  const user =await  currentUser();
  if(!user){
    redirect("/");
  }
};