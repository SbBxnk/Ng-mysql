import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../service/employee.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
// ปุ่ม จาก ng-ant
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-position-list',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatPaginatorModule,RouterLink,
    RouterLinkActive,NzButtonModule,NzCardComponent,NzIconModule],
  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.css'
})
export class PositionListComponent {
  title: string = 'ข้อมูลตำแหน่ง';
  displayedColumns: string[] = [
    'position_id',
    'position_name',
    'salary',
    'phone_number',
    'actions',
  ];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _employee: EmployeeService) {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  getData() {
    this._employee.getAllPositions().subscribe({
      next: (resp: any) => {
        this.dataSource.data = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  deletePosition(position_id: any) {
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
        this._employee.deletePosition(position_id).subscribe({
          next: (resp) => {
            console.log('delete Position is Successful!');
            this.getData();
            Swal.fire({
              icon: 'success',
              title: 'ลบข้อมูลสำเร็จ',
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


