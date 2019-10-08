import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/API/api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  item:any={};
  tab:string='tab1';
  constructor(private API:APIService) { }

  ngOnInit() {
  }

  send(){
    if(!this.item.Phone){return;}
    this.API.callFun({url:'/sendCode',data:this.item,method:'PUT'},(err,d)=>{
      if(d){this.tab='tab2';}
     });
  }

  Active(){
    if(!this.item.Phone){return;}
    if(this.item.password != this.item.password2){return swal('passwords do not match','','error')}
    this.API.callFun({url:'/forgetPass',data:this.item,method:'PUT',noToken:true},(err,d)=>{
      if(d){this.API.Auth.storeToken(d.token);this.item={};$("#ForgetPassModal").modal("hide");}
    });
  }

}
