import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  isLogged:boolean;

  constructor(private globalSrv: GeneralService,private router: Router,private authService:AuthService) {
    globalSrv.itemValue.subscribe((nextValue) => {
      if(nextValue=="true")
        this.isLogged = true;
      else
        this.isLogged = false; 
   });
  }

  ngOnInit(): void {
  }

  logOut(): void {
    localStorage.clear();
    this.globalSrv.theItem = "false";
    this.router.navigate(['/login']);
  }

}
