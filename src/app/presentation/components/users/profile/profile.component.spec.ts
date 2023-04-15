import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { UserRepository, AccountRepository } from "src/app/domain";
import { AlertsService } from "src/app/presentation/shared";
import { ProfileComponent } from "./profile.component";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userRepository: jasmine.SpyObj<UserRepository>;
  let accountRepository: jasmine.SpyObj<AccountRepository>;
  let alertsService: jasmine.SpyObj<AlertsService>;

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [ProfileComponent],
      providers: [
        FormBuilder,
        { provide: UserRepository, useValue: userRepository },
        { provide: AccountRepository, useValue: accountRepository },
        { provide: AlertsService, useValue: alertsService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component with user data', () => {
    const user = {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      Account: [],
      document: '123456789',
      password: 'password',
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    userRepository.getUserById.and.returnValue(of(user));
    fixture.detectChanges();

    expect(component.user).toEqual(user);
    expect(component.formEdit.value.document).toEqual(user.document);
    expect(component.formEdit.value.name).toEqual(user.name);
    expect(component.formEdit.value.email).toEqual(user.email);
    expect(userRepository.getUserById).toHaveBeenCalledWith(user.id);
  });

  it('should update the user data when the form is submitted', () => {
    const updatedUser = {
      id: '1',
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
      Account: [],
      document: '987654321',
      password: 'password',
    };
    const updatedFormValue = {
      email: updatedUser.email,
      name: updatedUser.name,
      document: updatedUser.document,
    };
    component.user = {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      Account: [],
      document: '123456789',
      password: 'password',
    };
    component.formEdit.setValue(updatedFormValue);
    userRepository.updateUser.and.returnValue(of(updatedUser));
    userRepository.getUserById.and.returnValue(of(updatedUser));

    component.changeDataAccount();


    expect(userRepository.getUserById).toHaveBeenCalledWith(component.user.id);
    expect(component.userData).toEqual(updatedUser);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(updatedUser));
  });

  it('should  the cmponent', () => {
    component.openModal()
    const modal = document.getElementById('popup-modal');
    expect(modal?.classList).not.toContain('block');

  });

  it('should   cmponent', () => {
    component.closeModal()
    const modal = document.getElementById('popup-modal');
    expect(modal?.classList).not.toContain('hidden');

  })

  it('cmponent', () => {
    
    component.getUserAccount()
  })
  it('deleteUser', () => {
    component.deleteUser()
  })
  it('changeDataAccount', () => {
    component.changeDataAccount()
  })
  

  it('ngOnInit', () => {
    component.ngOnInit()
  })
  
})