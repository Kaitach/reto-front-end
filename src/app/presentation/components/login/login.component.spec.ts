import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { userUseCaseProviders } from 'src/app/data/factory/userfactory';
import { UserRepository } from 'src/app/domain';
import { LoginGoogleUseCase } from 'src/app/domain/usecases/user/userGoogleLogin.usecase';
import { RouterTestingModule } from '@angular/router/testing';
import { UserEntity } from 'src/app/data';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userRepository: UserRepository;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  let mockUserRepository = {
    login: {
      useFactory: (userRepository: any) => {
        return {
          execute: () => of({})
        }
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        ReactiveFormsModule, 
        RouterTestingModule // Agrega el módulo RouterTestingModule a los imports
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: Auth, useValue: { root: {} } } // Modifica el proveedor Auth
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  

})
