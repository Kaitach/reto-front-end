import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { SingupComponent } from './singup';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { UserModel, UserRepository } from 'src/app/domain';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { UserEntity } from 'src/app/data';
import { LoginGoogleUseCase } from 'src/app/domain/usecases/user/userGoogleLogin.usecase';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from 'src/app/domain/models/decode-interface';

@Component({
  selector: 'app-login2',
  styleUrls: ['./login.component.scss'],

  templateUrl: './login.component.html',
})
export class LoginComponent {
  factory = userUseCaseProviders;

  public id: string = '';
  public customer = {};
  public account = {};
  public accountType = {};
  public password!: string;
  public username!: string;

  constructor(
    private userRepository: UserRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private autth: Auth
  ) {}

  formLogin = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    username: ['', [Validators.required, Validators.minLength(5)]],
  });

  loginCheck() {
    this.username = this.formLogin.value.username || '';
    this.password = this.formLogin.value.password || '';

    const data = {
      email: this.username,
      password: this.password,
    };
    this.login(data);
  }

  validateToken(token: string): boolean {
    return typeof token === 'string' && token !== '';
  }

  async mapAccountData(decodedToken: DecodedToken): Promise<UserEntity> {
    return {
      Account: [],
      document: 1234,
      email: decodedToken.email,
      id: '',
      name: decodedToken.name,
      password: '123456',
    };
  }

  async login(data: { email: string; password: string }) {
    const response = await this.factory.userLogin
      .useFactory(this.userRepository)
      .execute(data)
      .toPromise();
    const token = localStorage.getItem('token');
    const decodedToken: UserEntity = jwtDecode(token || response);
    const user: UserModel = {
      id: decodedToken?.id || '', // Verifica si la propiedad existe, en caso contrario asigna una cadena vacía
      email: decodedToken?.email || '',
      name: decodedToken?.name || '',
      Account: decodedToken?.Account || [],
      document: decodedToken?.document || '',
      password: decodedToken?.password || '',
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/user/profile']);
  }

  async register(account: UserModel) {
    this.factory.createUser
      .useFactory(this.userRepository)
      .execute(account)
      .subscribe(
        (data) => {
          this.router.navigate(['/user']);

          // manejo de la respuesta exitosa aquí
        },
        (error) => {
          console.error(error);
          // manejo de errores aquí
        }
      );

    const data = {
      email: account.email,
      password: account.password,
    };

    // función que se retrasará durante 2 segundos
    const delayedLogin = () => {
      this.login(data);
    };

    // llamar a setTimeout() con la función delayedLogin y un retraso de 2 segundos
    setTimeout(delayedLogin, 500);
  }

  async onClickLogin() {
    const loginGoogle = new LoginGoogleUseCase(this.autth);

    const userCredential = await loginGoogle.execute();
    const token = await userCredential.user?.getIdToken();
    const isTokenValid = this.validateToken(token);
    if (isTokenValid) {
      const decodedToken: DecodedToken = jwtDecode(token);
      const account: UserModel = await this.mapAccountData(decodedToken);
      await this.register(account);
    } else {
      console.error('Token inválido');
    }
  }
}
