/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ProductDto } from '../models/product-dto';
import { Product } from '../models/product';

/**
 * Product Controller
 */
@Injectable({
  providedIn: 'root',
})
class ProductControllerService extends __BaseService {
  static readonly gettAllProductsUsingGETPath = '/products';
  static readonly createProductUsingPOSTPath = '/products/create';
  static readonly deletePatientUsingDELETEPath = '/products/delete/{pzn}';
  static readonly chechIfPznAlreadyExistsUsingGETPath = '/products/exsitsByPzn/{pzn}';
  static readonly updateProductUsingPUTPath = '/products/update';
  static readonly getProductByIdUsingGETPath = '/products/{pzn}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * gettAllProducts
   * @return OK
   */
  gettAllProductsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<ProductDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/products`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }
  /**
   * gettAllProducts
   * @return OK
   */
  gettAllProductsUsingGET(): __Observable<Array<ProductDto>> {
    return this.gettAllProductsUsingGETResponse().pipe(
      __map(_r => _r.body as Array<ProductDto>)
    );
  }

  /**
   * createProduct
   * @param product product
   * @return OK
   */
  createProductUsingPOSTResponse(product: Product): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = product;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/products/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * createProduct
   * @param product product
   * @return OK
   */
  createProductUsingPOST(product: Product): __Observable<Product> {
    return this.createProductUsingPOSTResponse(product).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * deletePatient
   * @param pzn pzn
   */
  deletePatientUsingDELETEResponse(pzn: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/products/delete/${encodeURIComponent(String(pzn))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * deletePatient
   * @param pzn pzn
   */
  deletePatientUsingDELETE(pzn: string): __Observable<null> {
    return this.deletePatientUsingDELETEResponse(pzn).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * chechIfPznAlreadyExists
   * @param pzn pzn
   * @return OK
   */
  chechIfPznAlreadyExistsUsingGETResponse(pzn: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/products/exsitsByPzn/${encodeURIComponent(String(pzn))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * chechIfPznAlreadyExists
   * @param pzn pzn
   * @return OK
   */
  chechIfPznAlreadyExistsUsingGET(pzn: string): __Observable<boolean> {
    return this.chechIfPznAlreadyExistsUsingGETResponse(pzn).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * updateProduct
   * @param product product
   * @return OK
   */
  updateProductUsingPUTResponse(product: Product): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = product;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/products/update`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * updateProduct
   * @param product product
   * @return OK
   */
  updateProductUsingPUT(product: Product): __Observable<Product> {
    return this.updateProductUsingPUTResponse(product).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * getProductById
   * @param pzn pzn
   * @return OK
   */
  getProductByIdUsingGETResponse(pzn: string): __Observable<__StrictHttpResponse<ProductDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/products/${encodeURIComponent(String(pzn))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductDto>;
      })
    );
  }
  /**
   * getProductById
   * @param pzn pzn
   * @return OK
   */
  getProductByIdUsingGET(pzn: string): __Observable<ProductDto> {
    return this.getProductByIdUsingGETResponse(pzn).pipe(
      __map(_r => _r.body as ProductDto)
    );
  }
}

module ProductControllerService {
}

export { ProductControllerService }
