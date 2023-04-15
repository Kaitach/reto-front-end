import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { of } from "rxjs";
import {  CreateUserUseCase, UserModel, UserRepository } from "src/app/domain";
import { SingupComponent } from "./singup.component";
import { Auth } from "@angular/fire/auth";
import { signInWithPopup } from '@angular/fire/auth';
import { GoogleAuthProvider, UserCredential } from 'firebase/auth';



describe('SingupComponent', () => {
    let component: SingupComponent;
    let fixture: ComponentFixture<SingupComponent>;
    let userRepository: UserRepository 
    let mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    let mockUserRepository = {
      createUser:  jasmine.createSpyObj('accountRepository', ['createAccount'])
    }
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ SingupComponent ],
        imports: [ ReactiveFormsModule ],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: UserRepository, useValue: mockUserRepository },
          { provide: Auth, useValue: {} } 
        ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SingupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });


    
    it('should navigate to /user on successful signup', () => {
      const mockFormValues: UserModel  = {
        email: 'gmail.com', password: '2232131',
        id: "32123123",
        name: "Franco ",
        document: 324234,
        Account: []
      };
      const mockUserRepository = jasmine.createSpyObj('UserRepository', ['create']);
      const createUserUseCase = new CreateUserUseCase(mockUserRepository);
      spyOn(createUserUseCase, 'execute').and.returnValue(of(mockFormValues));
      
      spyOn(component.factory.createUser, 'useFactory').and.returnValue(createUserUseCase);
      
      component.signUp();
      
      expect(createUserUseCase.execute).toHaveBeenCalled();
      
   

    
      expect(component.factory.createUser.useFactory).toHaveBeenCalled();
      fixture.detectChanges();
    });

    it('should create the cmponent', () => {
      component.loginWithGoogle()
    });

    it('should  the cmponent', () => {
      component.onClickLogin()
    });

  });

