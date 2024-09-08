import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAllEmployee(): Observable<any> {
    return this.http.get(this.URL + "employee", { headers: this.getHeaders() });
  }

  addEmployee(EmployeeDetail: any): Observable<any> {
    return this.http.post(this.URL + "employee/add", EmployeeDetail, { headers: this.getHeaders() });
  }

  getOneEmployee(employee_id: any): Observable<any> {
    return this.http.get(this.URL + 'employee/' + employee_id, { headers: this.getHeaders() });
  }

  updateEmployee(employee_id: any, EmployeeDetail: any): Observable<any> {
    return this.http.put(this.URL + "employee/update/" + employee_id, EmployeeDetail, { headers: this.getHeaders() });
  }

  deleteEmployee(employee_id: any): Observable<any> {
    return this.http.delete(this.URL + "employee/delete/" + employee_id, { headers: this.getHeaders() });
  }

  getAllPositions(): Observable<any> {
    return this.http.get(this.URL + "position", { headers: this.getHeaders() });
  }


  getOnePosition(position_id: any): Observable<any> {
    return this.http.get(this.URL + "position/" + position_id, { headers: this.getHeaders() } );
  } 
  
  deletePosition(position_id:any){
    return this.http.delete(this.URL+"position/delete/" + position_id)
  }

  addPosition(PositionDetail:any){
    return this.http.post(this.URL+"position/add", PositionDetail)
  }

  updatePosition(position_id: any, PositionDetail: any) {
    return this.http.put(this.URL+"position/update/" +position_id ,PositionDetail)
  }




}
