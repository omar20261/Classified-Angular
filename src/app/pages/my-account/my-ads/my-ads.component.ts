import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/API/api.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {
  items:any=[];
  /*---------------------*/
  PerPage:number=9;
  currentPage:number=1;
  items_count:number;
  paginationID:string='API_paginate';
  /*-------------------*/
  BoxType:string='Larg'

  constructor(public API:APIService) {
    this.get(this.currentPage,false);
  }


  ngOnInit() {    (<any>window).PoPUpInit();;    (<any>window).productViewTrigger();}

  get(num,cb){window.scrollTo(0, 0);
    this.API.callFun({url:'/UserAdsList?num='+num+'&perPage=9&MyAds=true',method:'GET'},(err,d)=>{
      if(d){this.items=d.doc;this.items_count=d.count;}
     if(cb){cb();}});}

   Remove(i,id){
     this.API.callFun({url:'/Ads/'+id,method:'DELETE'},(err,d)=>{
       if(d){this.items.splice(i,1);swal('Success', '', 'success');}
     });
   }
   PageChanged(num){this.get(num,()=>{this.currentPage = num;});}

}
