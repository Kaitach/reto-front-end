import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DepositRepository, IDepositModel } from "../../../app/domain";
import { DepositImplementationRepositoryMapper } from "./mappers/deposit.mapper";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DepositImplementationRepository extends DepositRepository {

    depositMapper = new DepositImplementationRepositoryMapper();
    constructor(private http: HttpClient) {
        super();
    } 

    createDeposit(deposit: IDepositModel): Observable<IDepositModel> {
        return this.http
          .post<IDepositModel>('https://banco-backend.onrender.com/deposit',deposit)
      }
    
      updateDeposit(id: string, deposit: IDepositModel): Observable<IDepositModel> {
        return this.http
          .put<IDepositModel>(`https://banco-backend.onrender.com/deposit/${id}`, this.depositMapper.mapTo(deposit))
          .pipe(map(this.depositMapper.mapFrom));
      }
    
      getDepositById(id: string): Observable<IDepositModel> {
        return this.http
          .get<IDepositModel>(`https://banco-backend.onrender.com/deposit/${id}`)
          .pipe(map(this.depositMapper.mapFrom));
      }
    
      deleteDepositById(id: string): Observable<boolean> {
        return this.http
          .delete<boolean>(`https://banco-backend.onrender.com/deposit/${id}`);
      }
    
      getAllDepositByUserId(userId: string): Observable<IDepositModel[]> {
        return this.http
          .get<IDepositModel[]>(`https://banco-backend.onrender.com/deposit/all/${userId}`)
          .pipe(map(data => data.map(this.depositMapper.mapFrom)));
      }
}