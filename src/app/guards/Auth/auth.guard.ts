import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { CanActivate,ActivatedRoute, ActivatedRouteSnapshot,Router, RouterStateSnapshot } from '@angular/router';
import {AuthService} from '../../services/Auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,  private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
    let url = state.url;
    let LogoutURLs=['/login','/register']
    if(this.authService.loggedIn()){
      if(LogoutURLs.indexOf(url) >= 0){this.router.navigate(['/']);return false;}
      else{return true;}
    }
    else{
      if(LogoutURLs.indexOf(url) >= 0){return true;}
      else{this.router.navigate(['/']);return false;}
    }
  }
}
