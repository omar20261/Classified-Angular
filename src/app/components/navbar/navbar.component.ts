import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public AuthS:AuthService) {

  }


  ngOnInit() {
  }

}
