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
  selector: 'app-position-update',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NzCardModule,NzInputModule,NzButtonModule,NzSelectModule,],
  templateUrl: './position-update.component.html',
  styleUrls: ['./position-update.component.css'],
})
export class PositionUpdateComponent implements OnInit {
  title: string = 'แก้ไขข้อมูลตำแหน่ง';
  UpdatePositionForm!: FormGroup;
  PositionDetail: any;
  positions: any[] = []; //สร้างฟังก์ชัน PositionData เพื่อเก็บตัวแปรต่างๆจาก service มาไว้ใน positions โดยเก็บเป็นอาเรย์

  constructor(private _employee: EmployeeService,private _actRoute: ActivatedRoute,private router: Router) {
    const id = this._actRoute.snapshot.paramMap.get('position_id');
    this.getData(id);

    this.UpdatePositionForm = new FormGroup({
      position_id: new FormControl({ value: '', disabled: true }),
      position_name: new FormControl(''),
      salary: new FormControl(''),
      phone_number: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.PositionData();
  }

  PositionData(): void {
    this._employee.getAllPositions().subscribe({
      next: (resp: any) => {
        if (resp.status) {
          this.positions = resp.data;
        } 
      }
    });
  }


  getData(position_id: any) {
    this._employee.getOnePosition(position_id).subscribe({
      next: (data: any) => {
        console.log(position_id,data)
        this.PositionDetail = data.data[0];
        if (this.UpdatePositionForm) {
          this.UpdatePositionForm.setValue({
              position_id: this.PositionDetail.position_id,
              position_name: this.PositionDetail.position_name,
              salary: this.PositionDetail.salary,
              phone_number: this.PositionDetail.phone_number,
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
    const id = this._actRoute.snapshot.paramMap.get('position_id');
    if (id) {
      const updatedDataPosition = { ...this.UpdatePositionForm.value };
      
      this._employee.updatePosition(id, updatedDataPosition).subscribe({
        next: (resp: any) => {
          console.log('Update position is successfuly!')
          this.router.navigate(['/pstList'])
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
