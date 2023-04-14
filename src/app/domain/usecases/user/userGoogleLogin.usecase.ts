import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


    export class LoginGoogleUseCase {
      constructor(private auth: Auth) {}
    
      execute()  {
    
          return signInWithPopup(this.auth, new GoogleAuthProvider)
        }
      }
    
    