import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { LogedGuard } from './logged.guard';

describe('LogedGuard', () => {
  let guard: LogedGuard;
  let router: Router;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    guard = new LogedGuard(router);
  });

  it('should redirect to user profile when token is present', () => {
    localStorage.setItem('token', 'some_token');
    const route = new ActivatedRouteSnapshot();
    const state = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/user/profile']);
    localStorage.removeItem('token');
  });

  it('should allow access to login page when token is not present', () => {
    localStorage.removeItem('token');
    const route = new ActivatedRouteSnapshot();
    const state = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);
    expect(result).toBe(true);
  });
});

