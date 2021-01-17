import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  frmLogin: FormGroup;

  constructor(private toastr: ToastrService,private titleService:Title, private globalSrv: GeneralService,private router: Router,private formBuilder: FormBuilder, private http: HttpClient, private authService:AuthService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Giriş Yap");
    this.frmLogin = this.formBuilder.group({
      username: ["",Validators.required],
      password: ["",Validators.required],
    });
  }
 
  onSubmit(data: LoginForm) {
    this.authService.logIn(data.username,data.password).subscribe(
      (data:any) => {
        console.log(data);
        if(data.durumKodu==200)
        {
          localStorage.setItem("isLogged","true");
          localStorage.setItem("companyName", data.kurumAdi);
          localStorage.setItem("userID",data.userId);
          localStorage.setItem("userRole",data.role);
          this.globalSrv.theItem = "true";
          this.toastr.success("Giriş Başarılı");
          this.router.navigateByUrl('/');
        }
        else
        {
          localStorage.setItem("isLogged","false");
          this.globalSrv.theItem = "false";
        }
      },
      (err : HttpErrorResponse) => {
        alert("Giriş Hatalı");
      }
    );
  }
}

export class LoginForm {
  constructor(public username: string, public password: string){
  }
}
