import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { WasteService } from '../service/waste.service';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.css']
})
export class WasteComponent implements OnInit {

  public wastes:Waste[];
  constructor(private wasteService:WasteService, private router:Router,private gnrlService:GeneralService) { }

  ngOnInit(): void {
    if(this.gnrlService.theItem == "false")
      this.router.navigateByUrl("/login");
    this.wasteService.getWastesByUserId().subscribe((data:any) =>{
      this.wastes = data.rows;
      console.log(this.wastes);
    })
  }

}
export class Waste{
  id:number;
  kullaniciId:number;
  atik_turu:number;
  miktar:number;
  bekliyor:number;
  miktar_tip:string;
  ekleme_tarihi:Date;
  cinsi:string;
  atik_aciklama:string;
}
