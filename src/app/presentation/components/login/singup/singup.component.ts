import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { UserModel, UserRepository } from 'src/app/domain';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent  {
  factory = userUseCaseProviders;


  constructor (private formBuilder: FormBuilder, private router: Router, private userRepository: UserRepository, private auth: Auth
    ){}
 

  formRegister = this.formBuilder.group({
    document: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required, Validators.minLength(5)]],

  })


  mapFormValuesToObject(): UserModel {


    return {
      document: this.formRegister.value.document || '',
      password: this.formRegister.value.password || '',
      email: this.formRegister.value.email || '',
      name: this.formRegister.value.name || '',
      Account: [],
      id: ''

    };
  }


  signUp() {
    const formValues = this.mapFormValuesToObject();
        console.log(formValues)

    this.factory.createUser.useFactory(this.userRepository).execute(formValues).subscribe(
        (data) => {
          this.router.navigate(['/user']);

          // manejo de la respuesta exitosa aquí
        },
        (error) => {
          console.error(error);
          // manejo de errores aquí
        }
      );
      this.router.navigate(['/user']);

  }



loginWithGoogle(){
  return signInWithPopup(this.auth, new GoogleAuthProvider)
}

onClickLogin(){
  this.loginWithGoogle().then(response => console.log(response))
}

}













