import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})

export abstract class UserRepository{
  abstract createUser(user: UserModel): Observable<UserModel>;
  abstract updateUser(id: string, user: UserModel): Observable<UserModel>;
  abstract getUserById(id: string): Observable<UserModel>;
  abstract deleteUserById(id: string): Observable<boolean>;
  abstract getAllUsers(): Observable<UserModel[]>;
  abstract getUserByEmail(email: string): Observable<UserModel>;
  abstract login(email: string, password: string): Observable<string>;

}
