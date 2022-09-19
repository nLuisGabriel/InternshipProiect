import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProductDto} from "../api/models/product-dto";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productToSend$: BehaviorSubject<ProductDto | null> = new BehaviorSubject<ProductDto | null>(null);
  constructor() { }
}
