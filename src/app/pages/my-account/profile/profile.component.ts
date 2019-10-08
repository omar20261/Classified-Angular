import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/API/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  item:any={}
  pass:any={}
  constructor(public API:APIService) {
    this.item=this.API.Auth.loadUser();
  }

  ngOnInit() {

  }

  Save(){
    let i = this.item;
    let leftVal= this.API.Gv.CheckKeys(i,['Phone','Email','Fname','Lname']);
    if(leftVal){return swal('Error', 'please fill all fields ..  no '+leftVal+' entered', 'error');}
    this.API.callFun({url:'/user',method:'PUT',data:this.item,uploading:true},(err,d)=>{
      if(d){this.API.Auth.storeToken(d.token);this.item=this.API.Auth.loadUser();swal('Success', '', 'success');}
    });
  }

  changePass(){
    let i = this.pass;
    let leftVal= this.API.Gv.CheckKeys(i,['NewPassword','CurrentPassword']);
    if(leftVal){return swal('Error', 'please fill all fields ..  no '+leftVal+' entered', 'error');}
    if(i.NewPassword != i.NewPassword2){return swal('Error', 'passwords do not match', 'error');}
    this.API.callFun({url:'/changePass',method:'PUT',data:this.pass},(err,d)=>{
      if(d){this.API.Auth.storeToken(d.token);this.pass={};swal('Success', '', 'success');}
    });
  }

}
