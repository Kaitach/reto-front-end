import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountUseCaseProviders } from "src/app/data/factory/accountFactory";
import { userUseCaseProviders } from "src/app/data/factory/userfactory";
import { UserRepository, AccountRepository, IAccountModel, UserModel } from "src/app/domain";
import { AlertsService } from "../../shared";
import { AccountComponent } from "./account.component";
import { BehaviorSubject } from "rxjs";

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let alertsServiceSpy: jasmine.SpyObj<AlertsService>;
  let formBuilder: FormBuilder;
  let userRepository: UserRepository;
  let accountRepository: AccountRepository;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    alertsServiceSpy = jasmine.createSpyObj('AlertsService', ['alertOk', 'alertError']);

    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AlertsService, useValue: alertsServiceSpy },
        FormBuilder,
        UserRepository,
        AccountRepository,
       
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    userRepository = TestBed.inject(UserRepository);
    accountRepository = TestBed.inject(AccountRepository);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call updateAccountsUser method', () => {
    spyOn(component, 'updateAccountsUser');
    component.ngOnInit();
  });

  it('should update the user account list', () => {
    const accountList: IAccountModel[] = [{ id: '1', userID: 'Account 1', amount: 23, type: '23'}, {  id: '1', userID: 'Account 1', amount: 23, type: '23' }];
    component.accountList = accountList;
    component.updateAccountsUser();
  });



  it('should update the user account list', () => {
    const accountList: IAccountModel[] = [{ id: '1', userID: 'Account 1', amount: 23, type: '23'}, {  id: '1', userID: 'Account 1', amount: 23, type: '23' }];
    component.accountList = accountList;
    component.updateAccount();
    expect(component.user.Account).toEqual(['1', '2']);
  });

  it('should update the user account', () => {
    const accountList: IAccountModel[] = [{ id: '1', userID: 'Account 1', amount: 23, type: '23'}, {  id: '1', userID: 'Account 1', amount: 23, type: '23' }];
    component.accountList = accountList;
    component.updateAccountList();
    expect(component.user.Account).toEqual(['1', '2']);
  });

  let  id: 2
  let user:'23'

  it('should open the modal', () => {
    component.abrirModal(user, id);
    const modal = document.getElementById('popup-modal');
    expect(modal?.classList).toContain('block');
    expect(modal?.classList).not.toContain('hidden');
  });

  it('should close the modal', () => {
    component.closeModal();
    const modal = document.getElementById('popup-modal');
    expect(modal?.classList).not.toContain('block');
    expect(modal?.classList).toContain('hidden');

  })

  it('should delete the user account', () => {   
    component.deleteAccount(user);
  });

})




 
