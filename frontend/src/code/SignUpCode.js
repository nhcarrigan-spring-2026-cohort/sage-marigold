export const eightLetters = function (para1,para2) {

  return para1.length > 8 && para2.length > 8
  

  }

  export const capitalCharacters = function(para1,para2){
    const capitalLetters = /[A-Z]/
    return capitalLetters.test(para1) && capitalLetters.test(para2)
  }


 export const symbolsCharacters = function(para1,para2){

  const symbols =  /[!@#$%^&*(),.?":{}|<>]/;
  return symbols.test(para1) && symbols.test(para2);
 }

 export const numbersCharacters = function(para1,para2){
  const numbers =  /[0-9]/;
  return numbers.test(para1) && numbers.test(para2);
 }

  export const isValidName = function(firstName,lastName){
  const Name_Regex = /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}[.]{0,1}$/
   return Name_Regex.test(firstName) && Name_Regex.test(lastName)
 }
