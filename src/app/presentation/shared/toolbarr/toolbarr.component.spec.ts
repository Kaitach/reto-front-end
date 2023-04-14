import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarrComponent } from './toolbarr.component';
import { ToolbarrModule } from './toolbarr.module';

describe('ToolbarrComponent', () => {
  let component: ToolbarrComponent;
  let fixture: ComponentFixture<ToolbarrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ToolbarrModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
