import { createContext, useContext } from "react"
import {
  getAuth,
  RecaptchaVerifier
} from "firebase/auth";
import { auth, firebase} from "../firebase";

export const userContext = createContext({
  user: null,
  logIn: () => {},
  logOut: () => {}
})

export function UserContextProvider({ children }){
  
  function mobileSignIn(number){
    try{
      // firebase.auth().settings.appVerificationDisabledForTesting = true;
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "submit-btn",
        // {}
        {
          'size': 'invisible',
          'callback': (response) => {
            // firebase.auth().signInWithPhoneNumber(number, response).then((result) => console.log('resultXZZZ', result)).catch((err) => console.log('errXZZZZ', err));
          }
        }
      );
      return firebase.auth().signInWithPhoneNumber(number, recaptchaVerifier);
    } catch(error) {
      console.log('error', error);
    }
  }

  return <userContext.Provider value={{mobileSignIn}}> {children} </userContext.Provider>
}

export function useAuthContext(){
  return useContext(userContext);
}