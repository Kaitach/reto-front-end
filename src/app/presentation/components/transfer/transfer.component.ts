import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { transferUseCaseProviders } from 'src/app/data/factory/transferFactory';
import { IAccountModel, TransferModel, TransferRepository } from 'src/app/domain';
import { AlertsService } from '../../shared';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

 factory = transferUseCaseProviders
 accounts:IAccountModel [] = []
 constructor(    public AlertsService: AlertsService,
  private formBuilder: FormBuilder,  private transferRepository:TransferRepository  ) {}
  ngOnInit(): void {
    const account = localStorage.getItem('accountList');
    if (account) {
      this.accounts = JSON.parse(account);
    }    }

  formEdit = this.formBuilder.group({
  
    receiverAccountId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{24}')]],
    senderAccountId: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{24}/)]],
    amount: [1, [Validators.required, Validators.min(1)]]
  });

  createTransfer(){
    const transfer:TransferModel = {
      amount: this.formEdit.value.amount as number,
      receiverAccountId: this.formEdit.value.receiverAccountId as string,
      senderAccountId: this.formEdit.value.senderAccountId as string,
      id: ''
      
    }

    this.factory.createUser.useFactory(this.transferRepository).execute(transfer).subscribe()
    this.AlertsService.alertOk()

  }



}
