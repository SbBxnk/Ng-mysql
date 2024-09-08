import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common'; // Import CommonModule
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzCardComponent, NzInputModule, NzButtonComponent, NzSelectModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  title: string = 'เพิ่มพนักงาน';
  employeeForm!: FormGroup;
  positions: any[] = [];
  
  
  constructor(private _employee: EmployeeService, private router: Router) {
    this.employeeForm = new FormGroup({
      employee_id: new FormControl(''),
      employee_name: new FormControl(''),
      position_id: new FormControl(''),
      salary: new FormControl(''),
      address: new FormControl(''),
      phone_number: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadPositions();
  }
  
  loadPositions(): void {
    this._employee.getAllPositions().subscribe({
      next: (resp: any) => {
        if (resp) {
          this.positions = resp.data;
        } else {
          console.error('Failed to load positions');
        }
      },
      error: (err) => {
        console.error('Error loading positions:', err);
      }
    });
  }

  submit(): void {
    Swal.fire({
      icon: "success",
      title: "เพิ่มข้อมูลสำเร็จ",
      showConfirmButton: false,
      timer: 2000,
    });
  
    this._employee.addEmployee(this.employeeForm.value).subscribe({
      next: (resp) => {
        console.log('Add Employee is Successful!', resp);
        this.employeeForm.reset();
        this.router.navigate(['/empList']);
      },
      error: (err) => {
        console.error('Error adding employee:', err);
      }
    });
  }
}
