import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { APIService } from '../../services/API/api.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {
  @Input() item:any;
  @Input() IsImg:any;
  @Input() name:any;
  @Input() accept:any;
  @Input() multi:boolean;
  @Input() ind:number;
  @Input() defaultImg:number;
  @Output() onChange = new EventEmitter<any>();
  loading:boolean;
  @Input() innerBtn:boolean;

  constructor(public API:APIService) {

  }

  ngOnInit() {
    if(!this.item.oldImg){this.item.oldImg=[]};
    if(!this.item[this.name] && this.multi){this.item[this.name]=[]}
  }

  IsBase64(img){return img && img.length > 24}

  imgPath(){return this.getItem()?!this.IsBase64(this.getItem())?this.API.Gv.serverURL+'/render/'+this.getItem():this.getItem():''}

  allowDrop(ev) {
     ev.preventDefault();
   }

   drag(ev) {
     ev.dataTransfer.setData("text", ev.target.id);
   }

   drop(ev) {
     ev.preventDefault();
     this.changeTo64(ev.dataTransfer.files)
   }

  getItem(){return this.multi?this.item[this.name][this.ind]:this.item[this.name];}
  setItem(img){this.multi?this.item[this.name][this.ind]=img:this.item[this.name]=img;}

  changeTo64(files){this.loading=true;
    this.API.Gv.readAsDataURL(files,(r)=>{this.loading=false;
      /*--------oldImg---------*/
      let img=this.getItem();
      if(img && !this.IsBase64(img)){this.item.oldImg?this.item.oldImg.push(img):this.item.oldImg=[img];}
      /*-----------------*/
       this.setItem(r);
       this.onChange.emit();
       // console.log(this.item)
     });
  }

  remove(e){e.preventDefault();
    if(!this.IsBase64(this.getItem())){this.item.oldImg.push(this.getItem());}

    if(this.multi){ this.item[this.name].splice(this.ind,1)}
    else{this.setItem(null);}
    console.log(this.item)
  }

}
