import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  isLogged:boolean;
  companyName:string;

  constructor(private titleService:Title, private authService:AuthService) {
    this.titleService.setTitle("Anasayfa");
    this.isLogged = this.authService.isLogged();
    if(this.isLogged)
      this.companyName = localStorage.getItem("companyName");
  }

  ngOnInit(): void {
  }

}
