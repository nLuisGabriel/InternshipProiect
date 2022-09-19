import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInfoComponent} from "./user-info/user-info.component";
import {ProductStockRoutingModule} from "./product-stock-routing.module";
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardModule} from 'primeng/card';
import {StepsModule} from 'primeng/steps';
import { NewEntryComponent } from './new-entry/new-entry.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { ProductsComponent } from './products/products.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToolbarModule} from "primeng/toolbar";
import { StockComponent } from './stock/stock.component';
import {ConfirmationService} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
@NgModule({
  declarations: [UserInfoComponent, NewEntryComponent, ProductsComponent, StockComponent],
  imports: [
    CommonModule,
    ProductStockRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule,
    MessagesModule,
    MessageModule,
    StepsModule,
    InputNumberModule,
    TableModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    ToolbarModule,
    ToastModule,
    RippleModule,
    MessagesModule
  ],
  providers:[ConfirmationService]
})
export class ProductStockModuleModule { }
