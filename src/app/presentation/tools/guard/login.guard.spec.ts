import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LoginGuard } from './login.guard';

describe('LogeednGuard', () => {
  let guard: LoginGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LoginGuard]
    });
    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router);
  });

  it('should be created guard', () => {
    expect(guard).toBeTruthy();
  });



  it('should redirect to login when token is not present', () => {
    spyOn(router, 'navigate');
    const route = new ActivatedRouteSnapshot();

    const result = guard.canActivate(route, {} as RouterStateSnapshot);
    expect(result).toBe(false);
    localStorage.removeItem('token');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
