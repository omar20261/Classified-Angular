import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/API/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:any={};
  constructor(private API:APIService) { }

  ngOnInit() {}

  Register(){let i=this.user;
    if(!i.Fname || !i.Lname || !i.password || !i.Email || !i.Phone){return swal('error','please fill all fields','error');}
    if(i.password != i.password2){return swal('error','passwords do not match','error');}
    this.API.callFun({url:'/register',method:'POST',noToken:true,data:i},(err,d)=>{
      if(d){this.API.Auth.storeToken(d.token);$("#RegisterModal").modal("hide");$("#ActivePhoneModal").modal("show");}
     });
  }
}
