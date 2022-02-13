import jwt from "jsonwebtoken";
 

export const auth=(request,response,next)=>{
   try{
    const token=request.header("x-auth-token");
    console.log("token is:",token);
    jwt.verify(token,process.env.secretkey);
    next();
   } 
   catch(error){
       response.status(401).send({message:error.message})
       console.log(error.message)
   }
   
}