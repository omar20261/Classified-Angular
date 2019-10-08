import { Injectable } from '@angular/core';
import * as moment from 'moment/moment'
import * as _ from 'lodash';
// import { Ng2ImgToolsService } from 'ng2-img-tools';
import * as currency from 'currency-formatter';
import { AuthService } from "angular2-social-login";
import { environment } from '../../../environments/environment';
@Injectable()
export class GvarsService {
  G_Running:boolean ;
  serverURL:string=environment.apiUrl;
  uploading:boolean;
  uploaded:number=0;

  money_Mask:any = {
   align: "left",
   prefix: '$ ',
   includeThousandsSeparator:true,
   thousandsSeparatorSymbol:',',
   decimalSymbol: '.',
   requireDecimal: true,
   allowLeadingZeroes:true,
   decimalLimit:2
 }
 Favs:any=[];

  constructor(public _auth:AuthService) {

  }

  SocialSignIn(provider,cb){
      this._auth.login(provider).subscribe(
        (data) => { cb(false,data)}
        ,(err)=>{cb(err,null)}
      )
    }
  /*===================================*/
    readAsDataURL(files,cb){
      let Myimg = files[0];
      let myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => { if(cb){cb(myReader.result);} }
      myReader.readAsDataURL(Myimg);
    }
    /*===================================*/
    ImgPath(img,def){return img?(img.length > 24)?img:this.serverURL+'/render/'+img:def;}
    Dformat(d){return moment(d).format('DD MMM, YYYY')}
    CheckKeys(opj,arr){return _.findLast(_.map(arr,x=>(_.isEmpty(opj[x])&&!_.isNumber(opj[x]))?x:false),(x)=>x!=false);}
    /*===================================*/
    currencyFormat(m){return currency.format(m, { code: 'USD' })}
    currencyUnFormat(m){return currency.unformat(m, { code: 'USD' });}
    /*===================================*/

}
