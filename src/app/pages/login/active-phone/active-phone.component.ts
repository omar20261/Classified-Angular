import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/API/api.service';

@Component({
  selector: 'app-active-phone',
  templateUrl: './active-phone.component.html',
  styleUrls: ['./active-phone.component.css']
})
export class ActivePhoneComponent implements OnInit {
  item:any={};
  tab:string='tab1';

  constructor(private API:APIService) {

  }

  ngOnInit() {
    $( "#ActivePhoneModal" ).on('shown.bs.modal',()=>{let user = this.API.Auth.loadUser();this.item.Phone=user.Phone;$('[name="Phone"]').val(user.Phone)});
  }

    send(){
      if(!this.item.Phone){return;}
      this.API.callFun({url:'/sendCode',method:'PUT',data:this.item},(err,d)=>{
        if(d){this.tab='tab2';$("#LoginModal").modal("hide");}
       });
    }

    Active(){
      if(!this.item.Phone){return;}
      this.API.callFun({url:'/activePhone',data:this.item,method:'PUT'},(err,d)=>{
        if(d){this.API.Auth.storeToken(d.token);this.item={};$("#ActivePhoneModal").modal("hide");}
       });
    }

}
