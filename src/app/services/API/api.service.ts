import { Injectable } from '@angular/core';
import {HttpRequest,HttpEventType,HttpHeaders,HttpErrorResponse,HttpResponse,HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {GvarsService} from '../G_vars/gvars.service';
import {AuthService} from '../Auth/auth.service';
import {Observable,EMPTY, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';
declare var swal: any;
@Injectable()
export class APIService {

  constructor(private http:HttpClient,private router:Router,
    public Gv:GvarsService,public Auth:AuthService) {}
/*==================(callFun)=======================*/
// url - method - data - uploading - noToken - noloading - root 
callFun(op,cb){this.Gv.uploading=op.uploading;this.Gv.uploaded=0;this.Gv.G_Running=!op.noloading;
  let headers:any ={'Content-Type':'application/json'}
  if(!op.noToken && this.Auth.loadToken()){headers.Authorization=this.Auth.loadToken();}
  let req = new HttpRequest(op.method, (op.root?op.root:this.Gv.serverURL)+op.url, op.data, {headers:new HttpHeaders(headers),reportProgress: op.uploading});
  this.http.request(req).pipe(catchError(e => this.HttpErrHandler(e) )).subscribe((data:any)=> {
    if (data.type === HttpEventType.UploadProgress){this.Gv.uploaded = Math.round(100 * data.loaded / data.total);}
    else if(data instanceof HttpResponse){this.Gv.uploading=this.Gv.G_Running=false;
      if((data.body && data.body.success) || op.IgnoreSuccess){cb(null,data.body)}
      else{swal('Failed ', data.body.msg?data.body.msg:'', 'error');cb('Error:'+data.body.msg?data.body.msg:'',null)}
    }
  },(err)=>{this.Gv.uploading=this.Gv.G_Running=false;swal('Failed ',err?err:'', 'error');cb('Error:'+err,null)}); }
/*==================(confirmFun)=======================*/
confirmFun(t,b,html,cb){
  swal({
   title: t,
   text: b,
   html: html,
   type: 'warning',
   showCancelButton: true,
   confirmButtonText: 'Yes, delete it!',
   cancelButtonText: 'No, keep it' }).then(()=>{if(cb){cb();}},()=>{});}
/*===============(Http Error Handler)==============*/
  HttpErrHandler(res: HttpErrorResponse): Observable<any>{let errMsg;
    if(res.status === 404){
      // do NotFound stuff here
      errMsg='NotFound Http Error ';}
    else if(res.status === 401){
      // do Unauthorized stuff here
      this.Auth.logout();
      errMsg=' Unauthorized user .. please login to continue ';}
    else{ errMsg= res.message;}
   return throwError(errMsg);}
/*=============================================*/
CheckKeys(opj,arr){return _.findLast(_.map(arr,x=>_.isEmpty(opj[x])?x:false),(x)=>x!=false);}
/*=============================================*/
}
