import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { UserRepository, AccountRepository, UserModel, IAccountModel } from "src/app/domain";
import { AlertsService } from "../../shared";
import { AccountDataComponent } from "./account-data.component";
import { AccountComponent } from "../account/account.component";

describe('AccountDataComponent', () => {
  let component: AccountDataComponent;
  let fixture: ComponentFixture<AccountDataComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;
  let userRepositorySpy: jasmine.SpyObj<UserRepository>;
  let accountRepositorySpy: jasmine.SpyObj<AccountRepository>;
  let alertsServiceSpy: jasmine.SpyObj<AlertsService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    userRepositorySpy = jasmine.createSpyObj('UserRepository', ['getUserById']);
    accountRepositorySpy = jasmine.createSpyObj('AccountRepository', ['getAccountById', 'createAccount']);
    alertsServiceSpy = jasmine.createSpyObj('AlertsService', ['alertOk']);

    await TestBed.configureTestingModule({
      declarations: [ AccountDataComponent, AccountComponent ], // Declara el componente aquí
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: UserRepository, useValue: userRepositorySpy },
        { provide: AccountRepository, useValue: accountRepositorySpy },
        { provide: AlertsService, useValue: alertsServiceSpy }
      ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDataComponent);
    component = fixture.componentInstance;

    // set up test data
    const user: UserModel = {
      id: '1',
      email: 'test@test.com',
      name: 'Test User',
      Account: ['2', '3'],
      document: '123456',
      password: 'password'
    };
    const account1: IAccountModel = {
      id: '2',
      amount: 100,
      type: 'debit',
      userID: '1'
    };
    const account2: IAccountModel = {
      id: '3',
      amount: 200,
      type: 'credit',
      userID: '1'
    };
    const accountList: IAccountModel[] = [account1, account2];

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify(user);
      } else {
        return null;
      }
    });

    spyOn(localStorage, 'setItem').and.callFake(() => {});

    component.user = user;
    component.accountListSubject = new BehaviorSubject<IAccountModel[]>(accountList);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve user accounts on init', () => {
    const getAccountByIdSpy = accountRepositorySpy.getAccountById.and.returnValue(of({type: 'user', amount: 2 }));
    component.ngOnInit();
    expect(component.accountList.length).toBe(2);
    expect(getAccountByIdSpy).toHaveBeenCalledTimes(2);
  }); 

  it('should open the modal', () => {
    component.abrirModal();
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

  it('should close the create', () => {

      
      component.createAccount();
    
     
    });
    

  

  it('should close the create', () => {
    component.getUserAccounts();


  })
})