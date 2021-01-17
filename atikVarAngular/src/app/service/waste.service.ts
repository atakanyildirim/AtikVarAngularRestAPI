import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AddWasteForm } from '../addwaste/addwaste.component';
import { Waste } from '../waste/waste.component';

@Injectable({
  providedIn: 'root'
})
export class WasteService {

  constructor(private titleService:Title,private http: HttpClient) {
    this.titleService.setTitle("Atıklar");
   }

  /**
   * Get waste list by userid
   * @param {string,string} - username and password
   */
  public getWastesByUserId(){
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    return this.http.get<Waste[]>('http://localhost:3003/waste?kullaniciId='+localStorage.getItem("userID"),{headers: headers});
  }

  /**
   * add a new waste
   * @param {AddWasteForm}
   */
  public addWaste(waste:AddWasteForm){
    var formData = JSON.stringify({
      kullaniciId: localStorage.getItem("userID"),
      atikTuru: waste.atikTuru,
      miktar: waste.miktar,
      miktarTip: waste.miktarTip
    });

    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    
    return this.http.post<any>('http://localhost:3003/waste',formData,{headers: headers});
  }
}
