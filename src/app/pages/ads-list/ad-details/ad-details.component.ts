import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/API/api.service';
import {Router,ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
_:any=_;
  item:any={}
  items:any=[]
  Categories:any=[]
  Locations:any=[]
  MoreAds:any;

  selectedImg:string='img1'
  FeaturedOWL:any={items:3,/*loop:true,*/margin:30,autoplay:false,autoplayTimeout:10000,smartSpeed:2000,navSpeed:false,dots:false,rXsmall : 1,rXsmallNav : true,rXsmallDots : false,rXmedium : 2,rXmediumNav : true,rXmediumDots : false,rSmall : 2,rSmallNav : true,rSmallDots : false,rMedium : 2,rMediumNav : true,rMediumDots : false,rLarge : 3,rLargeNav : true,rLargeDots : false,nav:true}
  adsOWL:any={items:6,/*loop:true,*/margin:15,onInitialized:()=> (<any>window).moveNav(),autoplay:true,autoplayTimeout:5000,smartSpeed:2000,navSpeed:false,dots:false,rXsmall : 2,rXsmallNav : true,rXsmallDots : false,rXmedium : 4,rXmediumNav : true,rXmediumDots : false,rSmall : 3,rSmallNav : true,rSmallDots : false,rMedium : 4,rMediumNav : true,rMediumDots : false,rLarge : 6,rLargeNav : true,rLargeDots : false,nav:true}
  ads2OWL:any={items:3,/*loop:true,*/margin:30,onInitialized:()=>  (<any>window).moveNav(),autoplay:true,autoplayTimeout:5000,smartSpeed:2000,navSpeed:false,dots:false,rXsmall : 1,rXsmallNav : true,rXsmallDots : false,rXmedium : 2,rXmediumNav : true,rXmediumDots : false,rSmall : 2,rSmallNav : true,rSmallDots : false,rMedium : 2,rMediumNav : true,rMediumDots : false,rLarge : 3,rLargeNav : true,rLargeDots : false,nav:true}
  zoomOptions:any={peepView: {borderColor: '#fff',borderWidth: '2px',borderStyle: 'solid',cursor: 'zoom-in',},
  settings: {zoom: 4}}


  constructor(public API:APIService,public route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      // this.getCatego(1,()=>{
        // this.getLocation(1,()=>{
          if(params['id']){this.get(params['id'],
          ()=>{this.getFav(this.MoreUserAds(false)
          )}
        )}
        })
      // })
    // });
  }

  ngOnInit() {

  }

  get(id,cb){
    this.API.callFun({url:'/OneAd/'+id,method:'GET'},(err,d)=>{
      if(d&&d.doc){this.item=d.doc}
      if(cb){cb()}
    });
  }
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



  getFav(cb){
    if(this.API.Auth.loadUser()&&this.API.Auth.loadUser()._id){
    this.API.callFun({url:'/MyFav',method:'GET'},(err,d)=>{
      if(d&&d.doc){this.API.Gv.Favs=d.doc.favorites;}
     if(cb){cb();}});
   }else{if(cb){cb();}}
  }

  SaveAd(id,cb){
    this.API.callFun({url:'/Fav',data:{_id:id},method:'PUT'} ,(err,d)=>{
      if(d&&d.doc){this.API.Gv.Favs=d.doc.favorites;}
     if(cb){cb();}});
  }

  MoreUserAds(cb){
     this.API.callFun({url:'/AdsList?num=1&ad='+this.item._id+'&user='+this.item.user,method:'GET'},(err,d)=>{
       if(d&&d.doc){this.MoreAds=d.doc;}
      if(cb){cb();}});
  }
}
