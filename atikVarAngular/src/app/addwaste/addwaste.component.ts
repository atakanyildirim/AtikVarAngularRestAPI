import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WasteService } from '../service/waste.service';

@Component({
  selector: 'app-addwaste',
  templateUrl: './addwaste.component.html',
  styleUrls: ['./addwaste.component.css']
})
export class AddwasteComponent implements OnInit {
  addWasteForm:FormGroup;
  constructor(private router:Router, private toast:ToastrService, private wasteService:WasteService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addWasteForm = this.formBuilder.group(
      {
        atikTuru: ["",Validators.required],
        miktar: ["",Validators.required],
        miktarTip: ["",Validators.required],
      }
    )
  }

  onSubmit(formData:AddWasteForm)
  {
    this.wasteService.addWaste(formData).subscribe((data) => {
      if(data.durumKodu==201)
      {
        this.toast.success("Atık başarıyla eklendi");
        this.router.navigateByUrl("/waste");
      }
    },(error) => {
      this.toast.error("Bir hata oluştu");
    });
  }

}
export class AddWasteForm{
  atikTuru:number;
  miktar:number;
  miktarTip:string;
}
