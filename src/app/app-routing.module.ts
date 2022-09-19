import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./components/Login&Register/login-page/login-page.component";
import {GuardsGuard} from "./guards/guards.guard";

const routes : Routes = [
  {path: '',redirectTo:'/account/login', pathMatch: 'full'},
  {path: 'account', loadChildren: () => import('./components/Login&Register/login-register-module.module').then((m)=>m.LoginRegisterModuleModule)},
  {path: 'user', canActivate:[GuardsGuard],loadChildren:() =>import('./components/Product&Stock/product-stock-module.module').then((m)=>m.ProductStockModuleModule)}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
