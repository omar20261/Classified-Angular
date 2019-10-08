import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import {AuthService} from '../../services/Auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService:AuthService,  private router:Router){}
  //let routeTo = this.route.snapshot.queryParamMap.get('returnTo')
  //routeTo ||
  canActivate(){
    if(this.authService.loadUser().Urole == 'Admin'){ return true; }
    else{this.router.navigate(['/login'],{queryParams:{returnTo:"/admin"}});
    return false;}
  }
}
