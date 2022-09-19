/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserAccount } from '../models/user-account';

/**
 * User Controller
 */
@Injectable({
  providedIn: 'root',
})
class UserControllerService extends __BaseService {
  static readonly deleteUserUsingDELETEPath = '/account/delete/{id}';
  static readonly getUserAccountByEmilUsingGETPath = '/account/getAccount/{email}';
  static readonly registerAccountUsingPOSTPath = '/account/register';
  static readonly updateUserEmailUsingPUTPath = '/account/update/email';
  static readonly updateUserPasswordUsingPUTPath = '/account/update/password';
  static readonly updateUserUsernameUsingPUTPath = '/account/update/username';
  static readonly recoverAccountUsingPUTPath = '/account/update/{email}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * deleteUser
   * @param id id
   */
  deleteUserUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/account/delete/${encodeURIComponent(String(id))}`,
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
   * deleteUser
   * @param id id
   */
  deleteUserUsingDELETE(id: number): __Observable<null> {
    return this.deleteUserUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * getUserAccountByEmil
   * @param email email
   * @return OK
   */
  getUserAccountByEmilUsingGETResponse(email: string): __Observable<__StrictHttpResponse<UserAccount>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (email != null) __params = __params.set('email', email.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/account/getAccount/${encodeURIComponent(String(email))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserAccount>;
      })
    );
  }
  /**
   * getUserAccountByEmil
   * @param email email
   * @return OK
   */
  getUserAccountByEmilUsingGET(email: string): __Observable<UserAccount> {
    return this.getUserAccountByEmilUsingGETResponse(email).pipe(
      __map(_r => _r.body as UserAccount)
    );
  }

  /**
   * registerAccount
   * @param account account
   * @return OK
   */
  registerAccountUsingPOSTResponse(account: UserAccount): __Observable<__StrictHttpResponse<UserAccount>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = account;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/account/register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserAccount>;
      })
    );
  }
  /**
   * registerAccount
   * @param account account
   * @return OK
   */
  registerAccountUsingPOST(account: UserAccount): __Observable<UserAccount> {
    return this.registerAccountUsingPOSTResponse(account).pipe(
      __map(_r => _r.body as UserAccount)
    );
  }

  /**
   * updateUserEmail
   * @param params The `UserControllerService.UpdateUserEmailUsingPUTParams` containing the following parameters:
   *
   * - `verifyPassword`: verifyPassword
   *
   * - `newMail`: newMail
   *
   * - `currentMail`: currentMail
   *
   * @return OK
   */
  updateUserEmailUsingPUTResponse(params: UserControllerService.UpdateUserEmailUsingPUTParams): __Observable<__StrictHttpResponse<UserAccount>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.verifyPassword != null) __params = __params.set('verifyPassword', params.verifyPassword.toString());
    if (params.newMail != null) __params = __params.set('newMail', params.newMail.toString());
    if (params.currentMail != null) __params = __params.set('currentMail', params.currentMail.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/account/update/email`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserAccount>;
      })
    );
  }
  /**
   * updateUserEmail
   * @param params The `UserControllerService.UpdateUserEmailUsingPUTParams` containing the following parameters:
   *
   * - `verifyPassword`: verifyPassword
   *
   * - `newMail`: newMail
   *
   * - `currentMail`: currentMail
   *
   * @return OK
   */
  updateUserEmailUsingPUT(params: UserControllerService.UpdateUserEmailUsingPUTParams): __Observable<UserAccount> {
    return this.updateUserEmailUsingPUTResponse(params).pipe(
      __map(_r => _r.body as UserAccount)
    );
  }

  /**
   * updateUserPassword
   * @param params The `UserControllerService.UpdateUserPasswordUsingPUTParams` containing the following parameters:
   *
   * - `verifyPassword`: verifyPassword
   *
   * - `newPassword`: newPassword
   *
   * - `mail`: mail
   *
   * @return OK
   */
  updateUserPasswordUsingPUTResponse(params: UserControllerService.UpdateUserPasswordUsingPUTParams): __Observable<__StrictHttpResponse<UserAccount>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.verifyPassword != null) __params = __params.set('verifyPassword', params.verifyPassword.toString());
    if (params.newPassword != null) __params = __params.set('newPassword', params.newPassword.toString());
    if (params.mail != null) __params = __params.set('mail', params.mail.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/account/update/password`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserAccount>;
      })
    );
  }
  /**
   * updateUserPassword
   * @param params The `UserControllerService.UpdateUserPasswordUsingPUTParams` containing the following parameters:
   *
   * - `verifyPassword`: verifyPassword
   *
   * - `newPassword`: newPassword
   *
   * - `mail`: mail
   *
   * @return OK
   */
  updateUserPasswordUsingPUT(params: UserControllerService.UpdateUserPasswordUsingPUTParams): __Observable<UserAccount> {
    return this.updateUserPasswordUsingPUTResponse(params).pipe(
      __map(_r => _r.body as UserAccount)
    );
  }

  /**
   * updateUserUsername
   * @param params The `UserControllerService.UpdateUserUsernameUsingPUTParams` containing the following parameters:
   *
   * - `verifyPassword`: verifyPassword
   *
   * - `newUsername`: newUsername
   *
   * - `currentMail`: currentMail
   *
   * @return OK
   */
  updateUserUsernameUsingPUTResponse(params: UserControllerService.UpdateUserUsernameUsingPUTParams): __Observable<__StrictHttpResponse<UserAccount>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.verifyPassword != null) __params = __params.set('verifyPassword', params.verifyPassword.toString());
    if (params.newUsername != null) __params = __params.set('newUsername', params.newUsername.toString());
    if (params.currentMail != null) __params = __params.set('currentMail', params.currentMail.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/account/update/username`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserAccount>;
      })
    );
  }
  /**
   * updateUserUsername
   * @param params The `UserControllerService.UpdateUserUsernameUsingPUTParams` containing the following parameters:
   *
   * - `verifyPassword`: verifyPassword
   *
   * - `newUsername`: newUsername
   *
   * - `currentMail`: currentMail
   *
   * @return OK
   */
  updateUserUsernameUsingPUT(params: UserControllerService.UpdateUserUsernameUsingPUTParams): __Observable<UserAccount> {
    return this.updateUserUsernameUsingPUTResponse(params).pipe(
      __map(_r => _r.body as UserAccount)
    );
  }

  /**
   * recoverAccount
   * @param params The `UserControllerService.RecoverAccountUsingPUTParams` containing the following parameters:
   *
   * - `email`: email
   *
   * - `account`: account
   *
   * @return OK
   */
  recoverAccountUsingPUTResponse(params: UserControllerService.RecoverAccountUsingPUTParams): __Observable<__StrictHttpResponse<UserAccount>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.account;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/account/update/${encodeURIComponent(String(params.email))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserAccount>;
      })
    );
  }
  /**
   * recoverAccount
   * @param params The `UserControllerService.RecoverAccountUsingPUTParams` containing the following parameters:
   *
   * - `email`: email
   *
   * - `account`: account
   *
   * @return OK
   */
  recoverAccountUsingPUT(params: UserControllerService.RecoverAccountUsingPUTParams): __Observable<UserAccount> {
    return this.recoverAccountUsingPUTResponse(params).pipe(
      __map(_r => _r.body as UserAccount)
    );
  }
}

module UserControllerService {

  /**
   * Parameters for updateUserEmailUsingPUT
   */
  export interface UpdateUserEmailUsingPUTParams {

    /**
     * verifyPassword
     */
    verifyPassword: string;

    /**
     * newMail
     */
    newMail: string;

    /**
     * currentMail
     */
    currentMail: string;
  }

  /**
   * Parameters for updateUserPasswordUsingPUT
   */
  export interface UpdateUserPasswordUsingPUTParams {

    /**
     * verifyPassword
     */
    verifyPassword: string;

    /**
     * newPassword
     */
    newPassword: string;

    /**
     * mail
     */
    mail: string;
  }

  /**
   * Parameters for updateUserUsernameUsingPUT
   */
  export interface UpdateUserUsernameUsingPUTParams {

    /**
     * verifyPassword
     */
    verifyPassword: string;

    /**
     * newUsername
     */
    newUsername: string;

    /**
     * currentMail
     */
    currentMail: string;
  }

  /**
   * Parameters for recoverAccountUsingPUT
   */
  export interface RecoverAccountUsingPUTParams {

    /**
     * email
     */
    email: string;

    /**
     * account
     */
    account: UserAccount;
  }
}

export { UserControllerService }
