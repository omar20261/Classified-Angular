import { Component, OnInit,ElementRef, AfterViewInit  } from '@angular/core';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public _elementRef: ElementRef) {}
  ngOnInit() {}

  // ngAfterViewInit(){ this.addCostomScript("/assets/js/inspinia.js");}

  // addCostomScript(path){
  //   var script = document.createElement("script");
  //       script.type="text/javascript";script.src = path;
  //       this._elementRef.nativeElement.appendChild(script);}
}
