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
    return this.http.post('http://localhost:3000/users/login', body, { responseType: 'text' })
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
    return this.http.post<UserEntity>('http://localhost:3000/users', user);

    
  }
  updateUser(id: string, user: UserModel): Observable<UserModel> {
    console.log('afafasf')
    console.log(id)
    console.log(user)
    return this.http.put<UserEntity>(`http://localhost:3000/users/${id}`, user);
  }

  getUserById(id: string): Observable<UserModel> {
    return this.http
      .get<UserEntity>(`https://banco-backend.onrender.com/users/${id}`)
      .pipe(map(this.userMapper.mapFrom));
  }
  deleteUserById(id: string): Observable<boolean> {
    const url = `https://banco-backend.onrender.com/users/${id}`;
    return this.http.delete<boolean>(url);
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
