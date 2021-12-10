import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from '../../auth/shared/auth.service'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { DetailDto } from './detail.dto'

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  constructor(private _http: HttpClient,private _auth:AuthService) {

  }
  public getAllUserDetails():Observable<DetailDto[]>{
    var userId = this._auth.getUserID();
    return this._http.get<DetailDto[]>(`${environment.apiUrl}/customerDetails/retrieveByUserId/${userId}`);
  }

  public addUserDetail(detail:DetailDto):Observable<DetailDto>{
    var userId = this._auth.getUserID();
    if(this._auth.getUserID()<0){
      return null;
    }
    detail.userId = userId;
    return this._http.post<DetailDto>(`${environment.apiUrl}/customerDetails`,detail);
  }

  public updateDetail(detail:DetailDto):Observable<DetailDto>{
    return this._http.put<DetailDto>(`${environment.apiUrl}/customerDetails`,detail);
  }

  public deleteDetail(detailId:Number):Observable<void>{
    return this._http.delete<void>(`${environment.apiUrl}/customerDetails/${detailId}`);
  }
}
