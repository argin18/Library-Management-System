import React from 'react'
import { Link} from "react-router-dom";
import { useForm } from "react-hook-form";
const Login = () => {
  const {register, handleSubmit,formState:{errors}}=useForm()
const onSubmit=(data)=>{
console.log("Login data", data);

if(data.username==="argin18" && data.password ==="Sumitbhujel"){
  alert("Login successfully");
}else{
  alert("Invalid email or password");
}

}

  return (
   <div className=" w-screen h-screen">
     <div className='grid items-center p-30 gap-3 justify-center'>
      <h1 className=' text-center  text-2xl font-bold'>Login</h1>
      <div className="bg-white shadow rounded-2xl ">
        <form className='  p-3 grid  text-xl' 
      onSubmit={handleSubmit(onSubmit)}>

          <p>Select your Role:</p>
        <div className="flex justify-between" >
          <div className="flex gap-2 items-center">
            <label className=' cursor-pointer ' htmlFor="admin">Admin:</label>
          <input className='border cursor-pointer rounded-xl p-2'
           type="radio" id='admin' value="admin" name='role' placeholder='e.g: argin18' {...register('username',{
            required:true
          })} />{errors.username && <span>username is required..</span>}

          </div>
<div className="flex gap-2">
  <label className=' cursor-pointer ' htmlFor="librarian">Librarian:</label>
          <input className='border cursor-pointer rounded-xl p-2'
           type="radio" id='librarian' value="librarian" name='role' placeholder='e.g: argin18' {...register('username',{
            required:true
          })} />{errors.username && <span>username is required..</span>}
        
</div>
          </div>

        <div className="grid p-2 rounded-2xl gap-1" >
          <label htmlFor="">Username:</label>
          <input className='border rounded-xl p-2'
           type="text" placeholder='e.g: argin18' {...register('username',{
            required:true
          })} />{errors.username && <span>username is required..</span>}
        </div>
        <div className="grid p-2 rounded-2xl gap-1">
          <label htmlFor="">Password:</label>
          <input className='border rounded-xl p-2'
           type="password" {...register('password',{
            required:true
          })} />{errors.password && <span>password is required..</span>}
        </div>
        <button className=' cursor-pointer font-mono mt-3 justify-self-center active:scale-95 duration-200 text-2xl font-bold transition-all bg-green-500 active:bg-green-200  w-32 p-2 rounded-2xl gap-1' type='submit' >Login</button>
      </form>
      <p className='text-center mb-3'>I don't have any account <Link className='text-orange-600 underline font-semibold' to="/signup">Sign Up.</Link></p>
   </div> </div>
   </div>
  )
}

export default Login
