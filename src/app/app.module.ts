import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header&Footer/header/header.component';
import { FooterComponent } from './components/Header&Footer/footer/footer.component';
import {interceptorProviders} from "./interceptors/interceptors";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabMenuModule} from "primeng/tabmenu";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MenubarModule} from 'primeng/menubar';
import {UserServiceService} from "./services/user.service.service";
import {UserInfoComponent} from "./components/Product&Stock/user-info/user-info.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TabMenuModule,
    CommonModule,
    MenubarModule,
    BrowserAnimationsModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
