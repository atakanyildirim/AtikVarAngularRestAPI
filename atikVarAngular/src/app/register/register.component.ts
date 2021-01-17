import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  frmRegister: FormGroup;

  constructor(private router:Router,private toastr: ToastrService,private companyService:CompanyService, private titleService:Title, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.titleService.setTitle("Kayıt Ol");
    this.frmRegister = this.formBuilder.group({
      companyName: ["",Validators.required],
      userName: ["",Validators.required],
      password: ["",Validators.required],
      addressName: ["",Validators.required],
      address: ["",Validators.required],
    });
  }
  
  onSubmit(data: RegisterForm) {
    this.companyService.addCompany(data).subscribe((response:any) =>{
      if(response.durumKodu==201)
      {
        this.toastr.success("Başarıyla Kullanıcı Oluşturuldu");
        this.router.navigateByUrl("/waste");
      }
    }, (error: HttpErrorResponse) => {
      console.log(error.error.mesaj)
      this.toastr.error("Bir hata oluştu: " + error.error.mesaj);
    });
  }
}
export class RegisterForm {
  constructor(public companyName: string, public userName: string, public password:string, public addressName:string,public address:string){
  }
}
