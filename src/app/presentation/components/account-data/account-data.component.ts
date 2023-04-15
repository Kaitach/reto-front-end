import { IAccountModel } from './../../../domain/models/account.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountUseCaseProviders } from '../../../../app/data/factory/accountFactory';
import { AccountRepository, UserModel, UserRepository } from '../../../../app/domain';
import { AlertsService } from '../../shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.css']
})
export class AccountDataComponent implements OnInit {
  factoryAccount = AccountUseCaseProviders
  accountList: IAccountModel[] = [];

  user: UserModel = {
    id: '',
    email: '',
    name: '',
    Account: [],
    document: '',
    password: ''
  };
  constructor(    private router: Router,    public AlertsService: AlertsService,

    private formBuilder: FormBuilder, private userRepository: UserRepository, private accountRepository:AccountRepository  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }  
    this.accountListSubject.subscribe((accountList) => {
      localStorage.setItem('accountList', JSON.stringify(accountList));
    });
  }

  formEdit = this.formBuilder.group({
    type: [ 'debit', Validators.required],

      
    });

  
  abrirModal() {
    const modal = document.getElementById('popup-modal');
    modal?.classList.add('block');
    modal?.classList.remove('hidden');
  }


closeModal(){
  const modal = document.getElementById('popup-modal');
  modal?.classList.remove('block');
  modal?.classList.add('hidden');
}


getUserAccounts(){
  for (let i = 0; i < this.user.Account.length; i++) {  
    this.factoryAccount.getAccountById.useFactory(this.accountRepository)
    .execute(this.user.Account[i]).subscribe({
      next: ((account) => {
        this.accountList.push(account);
        this.accountListSubject.next(this.accountList);

      }),
      error: (err) => {
        localStorage.removeItem('accountList')
      }
    })
  }
  localStorage.setItem('accountList', JSON.stringify(this.accountList))
}
accountListSubject = new BehaviorSubject<IAccountModel[]>(this.accountList);

createAccount(){

  const account:IAccountModel = {
    amount: 0,
    type: this.formEdit.value.type || '',
    userID: this.user.id,
  }
this.factoryAccount.createAccount.useFactory(this.accountRepository).execute(account).subscribe((accountt) => {
  this.accountList.push(accountt);



  })

  this.accountListSubject.subscribe((accountList) => {
    localStorage.setItem('accountList', JSON.stringify(accountList));
  });
  this.getUserAccounts()

  this.AlertsService.alertOk()
  
}


}
