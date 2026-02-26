export const eightLetters = function (para1,) {

  return para1.length >= 8 
  

  }

  export const capitalCharacters = function(para1,){
    const capitalLetters = /[A-Z]/
    return capitalLetters.test(para1)
  }


 export const symbolsCharacters = function(para1,){

  const symbols =  /[!@#$%^&*(),.?":{}|<>]/;
  return symbols.test(para1)
 }

 export const numbersCharacters = function(para1,){
  const numbers =  /[0-9]/;
  return numbers.test(para1)
 }

  export const isValidName = function(firstName,lastName){
  const Name_Regex = /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/
   return Name_Regex.test(firstName) && Name_Regex.test(lastName)
 }
