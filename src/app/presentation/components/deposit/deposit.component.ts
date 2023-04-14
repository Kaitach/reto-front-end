import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRepository, AccountRepository, IDepositModel, UserModel, DepositRepository } from 'src/app/domain';
import { depositUseCaseProviders } from './../../../data/factory/depositFactory';
import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../shared';
import { map } from 'rxjs';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

factory = depositUseCaseProviders  
depositList: IDepositModel[]  = [];

constructor(    private router: Router,    public AlertsService: AlertsService,

  private formBuilder: FormBuilder, private userRepository: UserRepository, private depositRepository:DepositRepository  ) {}
  user: UserModel = {
    id: '',
    email: '',
    name: '',
    Account: [],
    document: '',
    password: ''
  };
  ngOnInit(): void {

    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }  
    this.getDepositByUser()
  }

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


abrirModall(id: string, amount: number, reason: string, accountId: string ) {
  console.log('abrir modall')
  this.accountId = accountId
  this.reason = reason;
  this.id = id,
  this.amount = amount
  const modal = document.getElementById('popup-modall');
  modal?.classList.add('block');
  modal?.classList.remove('hidden');
}

closeModall(){
  const modal = document.getElementById('popup-modall');
  modal?.classList.remove('block');
  modal?.classList.add('hidden');
}

formEdit = this.formBuilder.group({
  
    accountID: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{24}')]],
    reason: ['', Validators.required],
    amount: [1, [Validators.required, Validators.min(1)]]
  });


    
 
createDeposit(){

const account:IDepositModel = {
  amount: this.formEdit.value.amount as number,
  accountId: this.formEdit.value.accountID as string,
  reason: this.formEdit.value.reason as string,
  userId: this.user.id as string,
}


this.factory.CreateDeposit.useFactory(this.depositRepository).execute(account).subscribe()
this.router.navigate(['/account']);



}

getDepositByUser(){

  this.factory.getByUser.useFactory(this.depositRepository)
  .execute(this.user.id)
  .pipe(
    map((deposits) => {
      this.depositList = deposits;
    })
  )
  .subscribe();

  }


  async deleteAccount(id:string){
    const deleteAccount = this.AlertsService.alertError()

    if(await deleteAccount == true) {
    this.factory.deleteDeposit.useFactory(this.depositRepository).execute(id).subscribe()
   
   
    this.router.navigate(['/user/profile']);

  }

  }

  id!:string 
  amount!: number
  reason!: string
  accountId!:  string



  formedit = this.formBuilder.group({
  
    reason: [this.reason, Validators.required],
  });


updateDeposit(){
  console.log("gola")
  const account:IDepositModel = {
    accountId: this.accountId,
    amount: this.amount,
    _id: this.id,
    reason: this.formedit.value.reason as string,
    userId: this.user.id,
  }
  this.factory.UpdateDeposit.useFactory(this.depositRepository).execute(this.id, account).subscribe()
  this.AlertsService.alertOk()

}


}


