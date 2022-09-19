import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductDto} from "../../../api/models/product-dto";
import {ProductControllerService} from "../../../api/services/product-controller.service";
import {StockDto} from "../../../api/models/stock-dto";
import { StockControllerService} from "../../../api/services/stock-controller.service";
import {Product} from "../../../api/models/product";
import {switchMap} from "rxjs";
import {Router} from "@angular/router";
@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  isProductPage=true;
  message = "";
  availability = true;
  currentProduct : Product = { pzn:"",supplier:"", productName:"", unit:"", packageSize:"",strength:""};
  currentStock!: StockDto;
  items!: MenuItem[];
  activeIndex = 0;
  product_form!: FormGroup;
  stockForm!: FormGroup;


  constructor(private _router: Router,private _formBuilder: FormBuilder, private _productController: ProductControllerService, private _stockController: StockControllerService) { }

  ngOnInit(): void {
    this.createSteps();
    this.createProductForm();
    this.createStockForm();
    this.pznAvailability();
  }

  private createSteps() {
    this.items = [
      {label: 'New product'},
      {label: "Associated stock"},
    ];
  }

  private createStockForm() {
    this.stockForm = this._formBuilder.group({
      price:["",Validators.required],
      quantity:["",Validators.required]
    })
  }

  private createProductForm() {
    this.product_form = this._formBuilder.group({
      pzn:[,
        [Validators.required, Validators.pattern(/^[0-9]+$/)]
      ],
      supplier:[,
        [Validators.required, Validators.maxLength(100)]
      ],
      productName:[,
        [Validators.required, Validators.maxLength(100)]
      ],
      strength:[,
        [Validators.required, Validators.maxLength(100)]
      ],
      packageSize:[,
        [Validators.required, Validators.maxLength(20)]
      ],
      unit:
        [,[Validators.required, Validators.maxLength(2)]
        ]
    })
  }

  modifyPzn(pzn : string){
    if(pzn!.length<8){
      let difference = 8 -pzn!.length
      pzn = "0".repeat(difference) + pzn;
      return pzn;
    }
    return pzn;
  }

  checkPznAvailability() {
    const pzn = this.modifyPzn(this.product_form.get("pzn")?.value);
    this._productController.chechIfPznAlreadyExistsUsingGET(pzn).subscribe( (response: boolean)=> {
      this.availability = response
      if (response == true) {
        this.message = "PZN already exist!"
      } else {
        this.message = "PZN is available!"
      }
    })



  }

  private pznAvailability() {
    this.product_form.get("pzn")?.valueChanges.subscribe(()=>{this.availability=true})
  }

  saveProduct() {
    this.currentProduct = this.product_form.getRawValue();
    this.currentProduct.pzn = this.modifyPzn(this.currentProduct.pzn!);
    this.isProductPage = false;
    this.activeIndex = 1;
    console.log(this.currentProduct)
  }

  goBackToProduct() {
    this.isProductPage = true;
    this.activeIndex = 0;
  }


  createStockAndProduct() {
    this.currentStock = this.stockForm.getRawValue();
    let stock = { stockDto : this.currentStock, productId: this.currentProduct.pzn! }
    let product :Product = { ...this.currentProduct};
    console.log(stock)

    this._productController.createProductUsingPOST(product).pipe(
      switchMap(()=>{
        return this._stockController.createStockUsingPOSTResponse(stock);
      } )
    ).subscribe(()=>{
        this._router.navigate(['user/products'])
    })

  }
}
