import { Component } from '@angular/core';
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
  selector: 'app-position-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzCardComponent, NzInputModule, NzButtonComponent, NzSelectModule],
  templateUrl: './position-add.component.html',
  styleUrl: './position-add.component.css'
})
export class PositionAddComponent {

  title: string = 'เพิ่มตำแหน่ง';
  positionsForm!: FormGroup;
  positions: any[] = [];
  
  
  constructor(private _employee: EmployeeService, private router: Router) {
    this.positionsForm = new FormGroup({
      position_id: new FormControl(''),
      position_name: new FormControl(''),
      salary: new FormControl(''),
      phone_number: new FormControl(''),
    });
  }

submit(): void {
  // ตรวจสอบว่ามี position_id ซ้ำใน positions หรือไม่
  const newPositionId = this.positionsForm.value.position_id;
  const isDuplicate = this.positions.some(position => position.position_id === newPositionId);

  if (isDuplicate) {
    Swal.fire({
      icon: "error",
      title: "ตำแหน่งนี้มีอยู่แล้ว",
      text: "กรุณาตรวจสอบ position_id ใหม่",
      confirmButtonText: "ตกลง",
    }).then(() => {
      // ล้างฟอร์มและออกจากฟังก์ชัน
      this.positionsForm.reset();
    });
    return; // หยุดการทำงานของฟังก์ชันถ้าพบตำแหน่งซ้ำ
  }

  this._employee.addPosition(this.positionsForm.value).subscribe({
    next: (resp) => {
      console.log('Add Position is Successful!');
      Swal.fire({
        icon: "success",
        title: "เพิ่มข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        this.positionsForm.reset();
        this.router.navigate(['/pstList']);
      });
    },
    error: (err) => {
      console.error('Error adding position:', err);
    }
  });
}
}
