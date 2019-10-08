import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/API/api.service';
import {Router,ActivatedRoute} from '@angular/router';

declare var swal: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items:any=[];
  Fitems:any;
  search:string;
/*---------------------*/
PerPage:number=20;
currentPage:number=1;
items_count:number;
paginationID:string='API_paginate';
/*-------------------*/
  FeaturedOWL:any={items:3,/*loop:true,*/margin:30,autoplay:false,autoplayTimeout:10000,smartSpeed:2000,navSpeed:false,dots:false,
  rXsmall : 1,rXsmallNav : true,rXsmallDots : false,rXmedium : 2,rXmediumNav : true,onInitialized:()=> (<any>window).moveNav(),
  rXmediumDots : false,rSmall : 2,rSmallNav : true,rSmallDots : false,rMedium : 2,rMediumNav : true,rMediumDots : false,rLarge : 3,rLargeNav : true,rLargeDots : false,nav:true}

  Categories:any=[]

  constructor(public API:APIService,public router:Router) {
    this.getCatego(1,()=>{
      this.getFAds(1,()=>{this.getAds(1,false);});
    });
  }

  ngOnInit() {
    (<any>window).PoPUpInit();
  }

  ngAfterViewInit(){
    // $('.owl-carousel').each(function(index) {
    //     $(this).find('.owl-nav, .owl-dots').wrapAll("<div class='owl-controls'></div>");
    // });
  }

  getFAds(num,cb){
    this.API.callFun({url:'/AdsList?num='+num+'&perPage=10&Featured=true',method:'GET'},(err,d)=>{
      if(d){this.Fitems=d.doc;}
      // this.items_count=d.count;
     if(cb){cb();}});}

   getAds(num,cb){
     this.API.callFun({url:'/AdsList?num='+num+'&perPage=12',method:'GET'},(err,d)=>{
       if(d){this.items=d.doc;this.items_count=d.count;}
      if(cb){cb();}});}

 getCatego(num,cb){
   this.API.callFun({url:'/CategoriesList?num='+num+'&PerPage=10',method:'GET'},(err,d)=>{
     if(d){this.Categories=d.doc;}
     // this.items_count=d.count;
    if(cb){cb();}});}

  GoSeach(){if(this.search){this.router.navigate(['/Ads'], { queryParams: {'search':this.search} });}}

}
