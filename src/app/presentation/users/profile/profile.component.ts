import { AccountRepository, IAccountModel } from 'src/app/domain';
import { AccountUseCaseProviders } from './../../../data/factory/accountFactory';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { UserModel, UserRepository } from 'src/app/domain';
import { UserEntity } from 'src/app/data';
import { Router } from '@angular/router';
import { AccountComponent } from '../../components/account/account.component';
import { AlertsService } from '../../shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  factory = userUseCaseProviders;
  factoryAccount = AccountUseCaseProviders;

  user: UserModel = {
    id: '',
    email: '',
    name: '',
    Account: [],
    document: '',
    password: '',
  };

  userData!: UserModel;

  formEdit = this.formBuilder.group({
    document: [this.user.document, Validators.required],
    name: [this.user?.name, Validators.required],
    email: [this.user?.email, Validators.required],
  });
  constructor(
    private router: Router,
    public AlertsService: AlertsService,
    private formBuilder: FormBuilder,
    private userRepository: UserRepository,
    private accountRepository: AccountRepository
  ) {}

  ngOnInit() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
    this.getUserAccount();

 
    console.log(this.userData);
  }

  openModal() {
    const modal = document.getElementById('popup-modall');
    modal?.classList.add('block');
    modal?.classList.remove('hidden');
  }

  getUserAccount() {
    this.factory.getUserById
      .useFactory(this.userRepository)
      .execute(this.user.id)
      .subscribe((user) => {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(user));
      });

  }

  ngOnChanges(): void {
    console.log('ngOnChanges')
   this.getUserAccount()
    
  }

  changeDataAccount() {
    if (this.formEdit) {
      this.user.name = this.formEdit.value.name as string;
      this.user.email = this.formEdit.value.email as string;
      this.user.document = this.formEdit.value.document as string;
    }
    this.factory.updateUser
      .useFactory(this.userRepository)
      .execute({
        id: this.user.id,
        user: this.user,
      })
      .subscribe((data) => {
        console.log(data);
      });
    this.getUserAccount();
    this.closeModal();
  }

 
  closeModal() {
    const modal = document.getElementById('popup-modall');
    modal?.classList.remove('block');
    modal?.classList.add('hidden');
  }

  deleteUser() {
    this.factory.deleteUser
      .useFactory(this.userRepository)
      .execute(this.user.id)
      .subscribe();
    this.closeModal();

    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
