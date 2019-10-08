import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/API/api.service';

@Component({
  selector: 'app-fav-ads',
  templateUrl: './fav-ads.component.html',
  styleUrls: ['./fav-ads.component.css']
})
export class FavAdsComponent implements OnInit {
  items:any=[];
  /*---------------------*/
  PerPage:number=9;
  currentPage:number=1;
  items_count:number;
  paginationID:string='API_paginate';

  BoxType:string='Larg'

  constructor(public API:APIService) {
    this.get(this.currentPage,false);
  }
  ngOnInit() {
    (<any>window).PoPUpInit();;
    (<any>window).productViewTrigger();
  }
  get(num,cb){window.scrollTo(0, 0);
    this.API.callFun({url:'/UserAdsList?num='+num+'&&perPage=9&MyFav=true',method:'GET'},(err,d)=>{
      if(d){this.items=d.doc;this.items_count=d.count;}
     if(cb){cb();}});}

   Remove(i,id){
     this.API.callFun({url:'/Fav',method:'PUT',data:{_id:id}},(err,d)=>{
       if(d && d.doc){this.API.Gv.Favs=d.doc.favorites;this.items.splice(i,1)}
    });
   }
   PageChanged(num){this.get(num,()=>{this.currentPage = num;});}

}
