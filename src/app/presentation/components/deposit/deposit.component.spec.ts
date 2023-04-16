import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { DepositRepository } from "../../../../app/domain";
import { AlertsService } from "../../shared";
import { DepositComponent } from "./deposit.component";
import { of } from "rxjs";

describe('DepositComponent', () => {
  let component: DepositComponent;
  let fixture: ComponentFixture<DepositComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let formBuilder: FormBuilder;
  let depositRepositorySpy: jasmine.SpyObj<DepositRepository>;
  let alertsServiceSpy: jasmine.SpyObj<AlertsService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    depositRepositorySpy = jasmine.createSpyObj('DepositRepository', ['getByUser', 'create', 'delete', 'update']);
    alertsServiceSpy = jasmine.createSpyObj('AlertsService', ['alertOk', 'alertError']);

    await TestBed.configureTestingModule({
      declarations: [ DepositComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: DepositRepository, useValue: depositRepositorySpy },
        { provide: AlertsService, useValue: alertsServiceSpy }
      ]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeUndefined();
  });
  

  
});