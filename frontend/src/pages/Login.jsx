import React, { useState } from 'react'

const Login = () => {

   const[email,setEmail]  = useState("")
   const[password,setPassword] = useState("")
   const[loading,setLoading] = useState(false)
 
  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
      
  try{
    console.log("Submitting login form")
    console.log("Success")

  }catch(error){

     console.log(`Error: ${error}`)
  }finally{
    setLoading(false)
  }
  }

  return (
  <div className="flex min-h-screen justify-center items-center">

    <form  className="w-full max-w-sm p-6 bg-white rounded shadow-md"
     onSubmit={handleSubmit}>
    
      <h2 className="text-2xl font-bold mb-6 text-center" >Login page</h2>
      <div className='container-login-input'>

        <label htmlFor='email'>E-mail</label>

      <input  className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        id="email"
         value={email}
        onChange={e => setEmail(e.target.value)} 
        disabled={loading}
        type="email" 
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        placeholder='E-mail'
        required/>
      
          <label htmlFor='password'>Password</label>

      <input  className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 "
      id='password' 
      value={password} 
      onChange={e =>setPassword(e.target.value)}
      disabled={loading}
      type='password' 
      placeholder='Password'
       required/>
     
      </div>

      <button className="w-full p-2 bg-emerald-700  text-white rounded hover:bg-emerald-800  disabled:opacity-50 mt-4 cursor-pointer   disabled:cursor-default  "
       disabled={loading} type='submit'>
       
       {loading  ? "Logging in..." : "Log in"}
       </button>
      
       
    </form>
  </div>
  )
}

export default Login
