
import React, { use, useState } from 'react'
import { eightLetters, isValidName, numbersCharacters, symbolsCharacters, } from '../code/validation'
import { capitalCharacters } from "../code/validation"


const SignUp = () => {

   const [email,setEmail] = useState()
   const[password,setPassword] = useState()
   const[checkPassword,setCheckPassword] = useState()
   const[firstName,setFirstName] = useState()
   const[lastName,setLastName] = useState()
   const[country,setCountry] = useState()
   const[loading,setLoading] = useState(false)
   





async function handleSubmit(e){
    e.preventDefault()

      if (password !== checkPassword) {
    alert("Passwords do not match");
    return;
  }
   if(!eightLetters(password,checkPassword)){
    alert("Password must have more than 8 characters");
    return;
   }

    if(!capitalCharacters(password,checkPassword)){
      alert("Password and check password must contain a Capital Letter")
      return
     }
      if(!symbolsCharacters(password,checkPassword)){
      alert("Password must contain a symbol")
      return
     }
     if(!numbersCharacters(password,checkPassword)){
      alert("Password must contain a number")
      return
     }
     if(!isValidName(firstName,lastName)){
      alert("Enter a valid name ")
      return
     }
   

    setLoading(true)

  try{
    console.log({email,password,firstName,lastName})
    console.log("Success")

  }catch(error){

     console.log(`Error: ${error}`)
  }finally{
    setLoading(false)
  }
  }
 
   
    
  return (
    <div className="flex min-h-screen justify-center items-center">
      <form
        className="w-full max-w-sm p-6 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="container-login-input">

          <label htmlFor="firstName">FirstName</label>

          <input
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            placeholder="FirstName"
            type="text"
            required
          />

          <label htmlFor='lastName'>LastName</label>

          <input 
          className='w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
          id='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
          placeholder='LastName'
          type='text'
          required
          />

          <label htmlFor="email">E-mail</label>

          <input
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            type="email"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            placeholder="E-mail"
            required
          />

          <label htmlFor="password">Password</label>

          <input
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 "
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            type="password"
            placeholder="Password"
            required
          />
          <label htmlFor='checkPassword'>Check Password</label>
           <input
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 "
            id="checkPassword"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            disabled={loading}
            type="password"
            placeholder="Password"
            required
          />
            <label htmlFor='country'>Country</label>
            <input 
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 "
              id='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={loading}
              type='text'
              placeholder='country'
              required
              />

        </div>

         <label htmlFor="18">Terms</label>
            <input className=' '
            type='checkbox'
            id="18"
           required/>

        <button
          className="w-full p-2 bg-emerald-700  text-white rounded hover:bg-emerald-800  disabled:opacity-50 mt-4 cursor-pointer   disabled:cursor-default  "
          disabled={loading}
          type="submit"
        >
          {loading ? "Logging in..." : "Sign Up"}

           
        </button>
      </form>
    </div>
  );  
}

export default SignUp;
