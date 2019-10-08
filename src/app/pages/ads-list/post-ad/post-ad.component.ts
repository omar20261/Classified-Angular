import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/API/api.service';
import {Router,ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  Categories:any=[];
  Countries:any=[];
  Locations:any=[];
  Country:any;
  item:any={userInfo:{},Specifications:[],Location:{},Category:{}}
  Specific:any={}
  ItemSpecificsVal:any;
  ImportSpecifics:boolean=false;
  constructor(public API:APIService,public router:Router,public route:ActivatedRoute) {
    let user = this.item.userInfo= this.API.Auth.loadUser();
    this.item.userInfo.Name = user.Fname?user.Fname + ' '+(user.Lname?user.Lname:""):'';
    this.route.queryParams.subscribe(params => {
      this.getCatego(1,()=>{this.getCountries(1,false)
        if(params['id']){this.get(params['id'],()=>this.getLocation(1,this.Country,false))}
      });
    })
  }

  ngOnInit() {
  }

  get(id,cb){
    this.API.callFun({url:'/OneAd/'+id,method:'GET'},(err,d)=>{
      if(d && d.doc){this.item=d.doc;this.Country=this.item.Location.Country._id;}
      if(cb){cb()}
    });
  }

  getCatego(num,cb){
    this.API.callFun({url:'/CategoriesList?num='+num,method:'GET'},(err,d)=>{
      if(d){this.Categories=d.doc;}
      // this.items_count=d.count;
     if(cb){cb();}});}

   getLocation(num,id,cb){//this.item.Location={};
     this.API.callFun({url:'/LocationsList?num='+num+'&Country='+id,method:'GET'},(err,d)=>{
       if(d){this.Locations=d.doc;}
       // this.items_count=d.count;
      if(cb){cb();}});}

      getCountries(num,cb){
        this.API.callFun({url:'/CountriesList?num='+num,method:'GET'},(err,d)=>{
          if(d){this.Countries=d.doc;}
          // this.items_count=d.count;
         if(cb){cb();}});}

    Add(){
      // this.item.Category=$('select[name=CategoryVal]').val()
      // this.item.Location=$('select[name=LocationVal]').val()
      let leftVal= this.API.Gv.CheckKeys(this.item,['Title','Price','userInfo','Location','Category','Images']);
      if(leftVal){return swal('Error', 'please fill all fields ..  no '+leftVal+' entered', 'error');}
      this.API.callFun({url:'/Ads',method:'POST',data:this.item,uploading:true},(err,d)=>{
        if(d){this.router.navigate(['/']);swal('Success', '', 'success');}
      });
    }
    Update(){
      // this.item.Category=$('select[name=CategoryVal]').val()
      // this.item.Location=$('select[name=LocationVal]').val()
      let leftVal= this.API.Gv.CheckKeys(this.item,['Title','Price','userInfo','Location','Category','Images']);
      if(leftVal){return swal('Error', 'please fill all fields ..  no '+leftVal+' entered', 'error');}
      this.API.callFun({url:'/Ads',method:'PUT',data:this.item,uploading:true},(err,d)=>{
        // this.router.navigate(['/']);
        if(d){swal('Success', '', 'success');}
      });
    }

  ImportItems(){if(!this.ItemSpecificsVal){return this.ImportSpecifics=false;}
    let arr = this.ItemSpecificsVal.split("\n");this.ItemSpecificsVal='';
    _.each(arr,(v,i)=>{
      if(v){this.item.Specifications.push({label:v.split(":")[0],val:v.split(":")[1]})}
    });
    this.ImportSpecifics=false
  }

}
