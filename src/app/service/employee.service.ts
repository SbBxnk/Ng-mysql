import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  URL = 'http://localhost:3000/api/'
  constructor(private http:HttpClient) { }



  getAllEmployee(){
    return this.http.get(this.URL+"employee")
  }

  addEmployee(EmployeeDetail:any){
    return this.http.post(this.URL+"employee/add", EmployeeDetail)
  }
  
  getOneEmployee(employee_id: any) {
    return this.http.get(this.URL + 'employee/' + employee_id);
  }


  updateEmployee(employee_id: any, EmployeeDetail: any) {
    return this.http.put(this.URL+"employee/update/" + employee_id ,EmployeeDetail)
  }
  
  deleteEmployee(employee_id:any){
    return this.http.delete(this.URL+"employee/delete/" + employee_id)
  }

  //Position

  getAllPositions(){
    return this.http.get(this.URL+"position")
  }

  getOnePosition(position_id: any) {
    return this.http.get(this.URL + "position/" + position_id);
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
