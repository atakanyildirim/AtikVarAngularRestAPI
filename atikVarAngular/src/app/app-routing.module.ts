import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddwasteComponent } from './addwaste/addwaste.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WasteComponent } from './waste/waste.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"waste", component:WasteComponent, canActivate: [AuthGuard]},
  {path:"waste/add", component:AddwasteComponent, canActivate: [AuthGuard]},
  {path:"register", component:RegisterComponent},
  {path:"about", component:AboutComponent},
  {path:"**", redirectTo: "", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
