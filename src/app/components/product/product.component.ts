import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { APIService } from '../../services/API/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() item:any;
  @Input() BoxType:any;
  @Input() deleteBtn:boolean;
  @Input() EditBtn:boolean;
  @Input() cancelBtn:boolean;
  @Output() OnDelete = new EventEmitter<any>();
  @Output() OnCancel = new EventEmitter<any>();

  constructor(public API:APIService) { }

  ngOnInit() {
  }

}
