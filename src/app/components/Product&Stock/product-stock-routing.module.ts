import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInfoComponent} from "./user-info/user-info.component";
import {RouterModule} from "@angular/router";
import {NewEntryComponent} from "./new-entry/new-entry.component";
import {ProductsComponent} from "./products/products.component";
import {StockComponent} from "./stock/stock.component";
import {GuardsGuard} from "../../guards/guards.guard";


const product_stock_user = [
  {path:"",component: UserInfoComponent},
  {path:"info", component: UserInfoComponent},
  {path:"new-entry", component: NewEntryComponent},
  {path: "products", component: ProductsComponent},
  {path: "stock", component: StockComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(product_stock_user)
  ],
  exports:[RouterModule]
})
export class ProductStockRoutingModule { }
