import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRepository, UserModel } from 'src/app/domain';
import { UserEntity } from './entities';
import { UserImplementationRepositoryMapper } from './mappers';

@Injectable({
  providedIn: 'root',
})



export class UserImplementationRepository extends UserRepository {
  userMapper = new UserImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post('https://banco-backend.onrender.com/users/login', body, { responseType: 'text' })
      .pipe(
        map(response => {
          const token = response;
          console.log(token);
          // Guardar el token en el local storage
          localStorage.setItem('token', token);
          return token;
        })
      );
  }
  
  

  createUser(user: UserModel): Observable<UserModel> {
    console.log(user)
    return this.http.post<UserEntity>('https://banco-backend.onrender.com/users', user);

    
  }
  updateUser(id: string, user: UserModel): Observable<UserModel> {
   
    return this.http.put<UserEntity>(`https://banco-backend.onrender.com/users/${id}`, user);
  }

  getUserById(id: string): Observable<UserModel> {
    return this.http
      .get<UserEntity>(`https://banco-backend.onrender.com/users/${id}`)
      .pipe(map(this.userMapper.mapFrom));
  }
  deleteUserById(id: string): Observable<any> {
    const url = `https://banco-backend.onrender.com/users/${id}`;
    const options = { body: { contraseña: 'abretesesamo' } };
    return this.http.delete(url, options);
  }
  getAllUsers(): Observable<UserModel[]> {
  console.log("getAllUsers")
    const url = 'https://banco-backend.onrender.com/users';
    return this.http.get<UserEntity[]>(url)
  }
  getUserByEmail(email: string): Observable<UserModel> {
    const url = `https://banco-backend.onrender.com/users?email=${email}`;
    return this.http.get<UserEntity[]>(url).pipe(
      map((entities) => entities[0]),
      map(this.userMapper.mapFrom)
    );
  }
}
