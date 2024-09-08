import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzCardModule, NzInputModule, NzButtonModule, NzSelectModule],
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit  {
  title: string = 'แก้ไขข้อมูลพนักงาน';
  UpdateEmployeeForm!: FormGroup;
  employees: any[] = [];
  EmployeeDetail: any;


  constructor(private _employee: EmployeeService,private _actRoute: ActivatedRoute,private router: Router) {
    const id = this._actRoute.snapshot.paramMap.get('employee_id');
    this.getData(id);

    this.UpdateEmployeeForm = new FormGroup({
      employee_id: new FormControl({ value: '', disabled: true }),
      employee_name: new FormControl(''),
      position_id: new FormControl(''),
      salary: new FormControl(''),
      address: new FormControl(''),
      phone_number: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.EmployeeData();
    this.PositionData();
  }

  EmployeeData(): void {
    this._employee.getAllEmployee().subscribe({
      next: (resp: any) => {
        if (resp.status) {
          this.employees = resp.data;
        } 
      }
    });
  }

  PositionData(): void {
    this._employee.getAllPositions().subscribe({
      next: (resp: any) => {
        if (resp.status) {
          this.employees = resp.data;
        } 
      }
    });
  }

  getData(employee_id: any) {
    this._employee.getOneEmployee(employee_id).subscribe({
      next: (data: any) => {
        console.log(employee_id,data)
        this.EmployeeDetail = data.data;
        if (this.UpdateEmployeeForm) {
          this.UpdateEmployeeForm.setValue({
            employee_id: this.EmployeeDetail.employee_id,
            employee_name: this.EmployeeDetail.employee_name,
            position_id: this.EmployeeDetail.position_id,
            salary: this.EmployeeDetail.salary,
            address: this.EmployeeDetail.address,
            phone_number: this.EmployeeDetail.phone_number,
          });
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }
  

  
  submit() {
    Swal.fire({
      icon: "success",
      title: "แก้ไขข้อมูลสำเร็จ",
      showConfirmButton: false,
      timer: 2000,
    });
    const id = this._actRoute.snapshot.paramMap.get('employee_id');
    if (id) {
      const updateDataEmployee = { ...this.UpdateEmployeeForm.value };
      
      this._employee.updateEmployee(id, updateDataEmployee).subscribe({
        next: (resp: any) => {
          console.log(resp)
          console.log('Update Employee is successfuly!')
          this.router.navigate(['/empList'])
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('ID not found');
    }
  }
}
