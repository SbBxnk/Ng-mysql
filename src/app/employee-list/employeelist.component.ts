import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../service/employee.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-employeelist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterLink, RouterLinkActive, NzButtonModule, NzCardComponent, NzIconModule],
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css'],
})

export class EmployeelistComponent implements AfterViewInit {
  title: string = 'ตารางพนักงาน';
  displayedColumns: string[] = [
    'employee_id',
    'name',
    'position_id',
    'salary',
    'address',
    'phone_number',
    'actions',
  ];
  dataSource = new MatTableDataSource<Employee>([]);
  totalEmployees: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _employee: EmployeeService) {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this._employee.getAllEmployee().subscribe({
      next: (resp: any) => {
        console.log('Response from getAllEmployee:', resp);
        // ตรวจสอบว่า resp.data มีข้อมูลที่คาดหวัง
        if (resp && resp.data) {
          this.dataSource.data = resp.data;
          this.totalEmployees = resp.data.length;
        } else {
          console.error('No data found in response');
        }
      },
      error: (err) => {
        console.log('Error fetching data:', err);
      },
    });
  }

  deleteEmployee(employee_id: any) {
    Swal.fire({
      title: 'คุณแน่ใจใช่ไหม?',
      text: "คุณจะไม่สามารถดำเนินการย้นกลับได้ถ้าคุณลบ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this._employee.deleteEmployee(employee_id).subscribe({
          next: (resp) => {
            console.log(resp);
            this.getData();
            Swal.fire({
              icon: 'success',
              title: 'ลบข้อมูลเรียบร้อย!',
              showConfirmButton: false,
              timer: 2000,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}

export interface Employee {
  employee_id: string;
  employee_name: string;
  position_id: string;
  salary: number;
  address: string;
  phone_number: number;
}
