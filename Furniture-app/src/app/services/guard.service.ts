import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private as: AuthService, private router: Router) { }

  path: import ("@angular/router").ActivatedRouteSnapshot[];
  route: import ("@angular/router").ActivatedRouteSnapshot;

  canActivate(path, route) : boolean | Observable<boolean> | Promise<boolean> {
    return new Promise(resolve => {
      this.as.user.subscribe(us => {
        if (us) {
          resolve(true);
        }
        else {
          this.router.navigate(['/login']);
        }
      })
    })
  }
}
