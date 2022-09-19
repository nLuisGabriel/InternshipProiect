import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {ProductDto} from "../../../api/models/product-dto";
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {Product} from "../../../api/models/product";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers:[ConfirmationService,MessageService]
})
export class ProductsComponent implements OnInit {
  private _subscriptionList: Subscription[]=[];
  products!: ProductDto[];
  productDialog!: boolean;
  product!: ProductDto;
  submitted!: boolean;
  selectedProducts!: ProductDto[] | null;
  constructor(private primengConfig: PrimeNGConfig, private _productController: ProductControllerService,
  private confirmationService: ConfirmationService,
              private messageService: MessageService, private _router:Router, private productService: ProductService
  ) { }

  ngOnInit(): void {
     this.getAllProducts();
     this.primengConfig.ripple = true;
  }



  editProduct(product: ProductDto) {
    this.product = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: ProductDto) {
    this.confirmationService.confirm({
      message:"Are you sure you want to delete the selected products?",
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.product)
        this.products = this.products.filter(val => val.pzn !== product.pzn);
        this._subscriptionList.push(
          this._productController.deletePatientUsingDELETE(product.pzn!).subscribe()
        )
        this.product = {};
        this.messageService.add({key: 'tlr', severity:'warn', summary: 'Warn', detail: 'The product has been deleted!'});
      }
    })
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    this.products[this.findIndexById(this.product.pzn!)] = this.product;
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    this.products = [...this.products];
    this.productDialog = false;
    const productToSend : Product= {
      productName: this.product.productName,
      pzn: this.product.pzn!,
      supplier:this.product.supplier,
      unit:this.product.unit,
      strength:this.product.strength,
      packageSize: this.product.packageSize
    }
    this._subscriptionList.push(
      this._productController.updateProductUsingPUT(productToSend).subscribe()
    )
    this.successMessage();
    this.product = {};
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].pzn === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  viewStock(product: ProductDto) {
    this.productService.productToSend$.next(product)
    this._router.navigate(['user/stock'])
  }

  private getAllProducts() {
    this._subscriptionList.push(
      this._productController.gettAllProductsUsingGET().subscribe((productList: ProductDto[])=>{
        this.products = productList;
      })
    )
  }

  openNew() {
    this._router.navigate(['user/new-entry'])
  }
  private successMessage(){
    this.messageService.add({key: 'tl', severity:'success', summary: 'Success', detail: 'The product has been modified!'});
  }
}
