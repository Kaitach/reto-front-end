import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountRepository, IAccountModel } from "../../../app/domain";
import { AccountImplementationRepositoryMapper } from "./mappers/account.mapper";
import { Observable, map } from "rxjs";
import { IAccountEntity } from ".";

@Injectable({
    providedIn: 'root',
})
export class AccountImplementationRepository extends AccountRepository {

    accountMapper = new AccountImplementationRepositoryMapper();
    constructor(private http: HttpClient) {
        super();
    }
    
    createAccount(account: IAccountModel): Observable<IAccountModel> {
        return this.http.post<IAccountEntity>(' http://localhost:3000/account',  account )

      }
    
      updateAccount(id: string, account: IAccountModel): Observable<IAccountModel> {
        return this.http
          .put<IAccountEntity>(`https://banco-backend.onrender.com/account/${id}`,  account )
      }
    
      getAccountById(id: string): Observable<IAccountModel> {
        return this.http
          .get<IAccountEntity>(`https://banco-backend.onrender.com/account/${id}`)
          
      }
    
      deleteAccountById(id: string): Observable<boolean> {
        return this.http
          .delete<boolean>(`https://banco-backend.onrender.com/account/${id}`);
      }
    
}
