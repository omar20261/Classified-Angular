import { Component,Input, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { APIService } from '../../services/API/api.service';

@Component({
  selector: 'app-ads-search',
  templateUrl: './ads-search.component.html',
  styleUrls: ['./ads-search.component.css']
})
export class AdsSearchComponent implements OnInit {
  @Input() Categories:any=[];
  @Input() Locations:any=[];
  @Input() search:any={};
  constructor(public API:APIService,public route:ActivatedRoute,public router:Router) {

  }

  ngOnInit() {
    if ($('#cp-search-form select.select2, #cp-search-form2 select.select2, #post-add-form select.select2').length) {
        $('#cp-search-form select.select2, #cp-search-form2 select.select2, #post-add-form select.select2').select2({
          theme: 'classic',dropdownAutoWidth: true,width: '100%'
        });
    }

  }

  GoSeach(){if(this.search.word){this.router.navigate(['/Ads'], { queryParams: {'search':this.search.word,Category:$('select[name=Category]').val(),Location:$('select[name=Location]').val()} });}}

}
