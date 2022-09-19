/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { StockDto } from '../models/stock-dto';

/**
 * Stock Controller
 */
@Injectable({
  providedIn: 'root',
})
class StockControllerService extends __BaseService {
  static readonly getAllStocksUsingGETPath = '/stocks';
  static readonly createStockUsingPOSTPath = '/stocks/create/{productId}';
  static readonly deleteStockUsingDELETEPath = '/stocks/delete/{id}';
  static readonly updateStockUsingPUTPath = '/stocks/update';
  static readonly getStockByProductUsingGETPath = '/stocks/{productId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * getAllStocks
   * @return OK
   */
  getAllStocksUsingGETResponse(): __Observable<__StrictHttpResponse<Array<StockDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stocks`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<StockDto>>;
      })
    );
  }
  /**
   * getAllStocks
   * @return OK
   */
  getAllStocksUsingGET(): __Observable<Array<StockDto>> {
    return this.getAllStocksUsingGETResponse().pipe(
      __map(_r => _r.body as Array<StockDto>)
    );
  }

  /**
   * createStock
   * @param params The `StockControllerService.CreateStockUsingPOSTParams` containing the following parameters:
   *
   * - `stockDto`: stockDto
   *
   * - `productId`: productId
   *
   * @return OK
   */
  createStockUsingPOSTResponse(params: StockControllerService.CreateStockUsingPOSTParams): __Observable<__StrictHttpResponse<StockDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.stockDto;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/stocks/create/${encodeURIComponent(String(params.productId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockDto>;
      })
    );
  }
  /**
   * createStock
   * @param params The `StockControllerService.CreateStockUsingPOSTParams` containing the following parameters:
   *
   * - `stockDto`: stockDto
   *
   * - `productId`: productId
   *
   * @return OK
   */
  createStockUsingPOST(params: StockControllerService.CreateStockUsingPOSTParams): __Observable<StockDto> {
    return this.createStockUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as StockDto)
    );
  }

  /**
   * deleteStock
   * @param id id
   */
  deleteStockUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/stocks/delete/${encodeURIComponent(String(id))}`,
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
   * deleteStock
   * @param id id
   */
  deleteStockUsingDELETE(id: number): __Observable<null> {
    return this.deleteStockUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * updateStock
   * @param dto dto
   * @return OK
   */
  updateStockUsingPUTResponse(dto: StockDto): __Observable<__StrictHttpResponse<StockDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = dto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/stocks/update`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockDto>;
      })
    );
  }
  /**
   * updateStock
   * @param dto dto
   * @return OK
   */
  updateStockUsingPUT(dto: StockDto): __Observable<StockDto> {
    return this.updateStockUsingPUTResponse(dto).pipe(
      __map(_r => _r.body as StockDto)
    );
  }

  /**
   * getStockByProduct
   * @param productId productId
   * @return OK
   */
  getStockByProductUsingGETResponse(productId: string): __Observable<__StrictHttpResponse<StockDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/stocks/${encodeURIComponent(String(productId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<StockDto>;
      })
    );
  }
  /**
   * getStockByProduct
   * @param productId productId
   * @return OK
   */
  getStockByProductUsingGET(productId: string): __Observable<StockDto> {
    return this.getStockByProductUsingGETResponse(productId).pipe(
      __map(_r => _r.body as StockDto)
    );
  }
}

module StockControllerService {

  /**
   * Parameters for createStockUsingPOST
   */
  export interface CreateStockUsingPOSTParams {

    /**
     * stockDto
     */
    stockDto: StockDto;

    /**
     * productId
     */
    productId: string;
  }
}

export { StockControllerService }
