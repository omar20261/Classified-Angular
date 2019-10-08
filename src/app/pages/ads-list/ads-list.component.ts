import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/API/api.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  items:any=[];
  Categories:any=[];
  Locations:any=[];
  Category:string;
  sortBy:any={}
  search:any={}
  /*---------------------*/
  PerPage:number=9;
  currentPage:number=1;
  items_count:number;
  paginationID:string='API_paginate';
  /*-------------------*/
  BoxType:string='small'
  label:any;
  constructor(public API:APIService,public route:ActivatedRoute,public router:Router) {
    this.route.queryParams.subscribe(params => {
      this.currentPage=1;
      if(params['label']){this.label=params['label'];}else{this.label=''}
      if(params['Category']){this.search.Category=this.sortBy.Category=params['Category'];}else{this.sortBy.Category=''}
      if(params['search']){this.search.word=this.sortBy.Search=params['search'];this.label='Search'}else{this.sortBy.Search=''}
      if(params['Location']){this.search.Location=this.sortBy.Location=params['Location'];}else{this.sortBy.Location=''}
      this.getAds(this.sortBy,1,()=>this.getCatego(1,()=>this.getLocation(1,false)));
    });
  }

  ngOnInit() {
    (<any>window).PoPUpInit();;
    (<any>window).productViewTrigger();
  }

  getAds(by,num,cb){window.scrollTo(0, 0);let url='/AdsList?num='+num;this.sortBy=by
    if(by){for(let k in by){if(by[k] && by[k] != 'undefined'){url=url+`&${k}=${by[k]}`}}}
    this.API.callFun({url:url+'&perPage=9',method:'GET'},(err,d)=>{
      if(d){this.items=d.doc;this.items_count=d.count;}
     if(cb){cb();}});}

   getCatego(num,cb){
     this.API.callFun({url:'/CategoriesList?num='+num+'&PerPage=10',method:'GET'},(err,d)=>{
       if(d){this.Categories=d.doc;}
       // this.items_count=d.count;
      if(cb){cb();}});}

      getLocation(num,cb){
        this.API.callFun({url:'/LocationsList?num='+num,method:'GET'},(err,d)=>{
          if(d){this.Locations=d.doc;}
          // this.items_count=d.count;
         if(cb){cb();}});}

     PageChanged(num){this.getAds(this.sortBy,num,()=>{this.currentPage = num;});}


}
