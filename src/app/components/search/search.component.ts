import { Component,OnInit,Input, Output,EventEmitter } from '@angular/core';
import { APIService } from '../../services/API/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() IsLoading:boolean;
  @Input() ShowIcon:boolean;
  suggestions:boolean;
  @Input() url:string;
  inputVal:string;
  @Input() list:any[] = [];
  @Input() placeholder:string = '';
  @Output() OnSelectItem = new EventEmitter<any>();
  @Output() OnSubmit = new EventEmitter<any>();
  constructor(public API:APIService) { }

  ngOnInit() {

  }

  OnSelectItemFun(val){
    this.inputVal=val.name;
    this.OnSelectItem.emit(val);
  }

  SelectSearchCountry(val){}

  ValEntered(){
    if(!this.inputVal || !this.url){return;}
   this.IsLoading=true;
   this.API.callFun({url:this.url+this.inputVal,method:'GET',noloading:true},(err,d)=>{
     this.IsLoading=false;
     if(d){this.list=d.success?d.doc:[];}
    });
  }

}
