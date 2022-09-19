import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ProductService} from "../../../services/product.service";
import {ProductDto} from "../../../api/models/product-dto";
import {StockDto} from "../../../api/models/stock-dto";
import {StockControllerService} from "../../../api/services/stock-controller.service";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers:[MessageService]
})
export class StockComponent implements OnInit {
  showForm = false;
  productReceived: ProductDto ={}
  stockReceived: StockDto ={}
  private _subscriptionList: Subscription[]=[];
  stockForm!: FormGroup;

  constructor(private primengConfig: PrimeNGConfig,private messageService: MessageService,private _formBuilder: FormBuilder,private _router: Router,private confirmationService: ConfirmationService,private productService: ProductService, private stockController: StockControllerService) { }

  ngOnInit(): void {

    this._subscriptionList.push(
      this.productService.productToSend$.subscribe((product:ProductDto | null)=>{
        this.productReceived = product!;
        if(product==null){
          this.goBackToTable();
        }
      }),

      this.stockController.getStockByProductUsingGET(this.productReceived.pzn!).subscribe((currentStock:StockDto)=>{
        this.stockReceived = currentStock;
      })
    )
    this.createStockForm()

  }

  confirm() {
    const stockToUpdate : StockDto = {id: this.stockReceived.id, quantity:this.stockForm.get('quantity')?.value , price: this.stockForm.get('price')?.value}
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this update?',
      accept: () => {
          this._subscriptionList.push(
              this.stockController.updateStockUsingPUT(stockToUpdate).subscribe()
          )
        this.successMessage()
        this.stockReceived.price = stockToUpdate.price
        this.stockReceived.quantity = stockToUpdate.quantity
        this.showForm = false;
      }
    });
  }


  goBackToTable() {
    this._router.navigate(['user/products'])
  }

  showUpForm() {
    this.showForm=true;
    this.stockForm.patchValue(this.stockReceived);
  }

  cancelForm() {
    this.showForm = false;
  }

  private createStockForm() {
    this.stockForm = this._formBuilder.group({
      price:["",Validators.required],
      quantity:["",Validators.required]
    })
  }

  private successMessage() {
    this.messageService.add({key: 'tl', severity:'success', summary: 'Success', detail: 'The stock has been changed!'});
  }
}
