import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { EmployeeService } from '../../service/employee.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NzCardModule, NzLayoutModule, NzGridModule,RouterLink,RouterOutlet,NzIconModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  title: string = 'DashBoard';
  totalEmployees: number = 0;
  totalPositions: number = 0;

  constructor(private _employee: EmployeeService) {
    this.getTotalEmployee();
    this.getTotalPosition();
  }

  getTotalEmployee() {
    this._employee.getAllEmployee().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.totalEmployees = resp.data.length;
      },
    });
  }
  getTotalPosition() {
    this._employee.getAllPositions().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.totalPositions = resp.data.length;
      },
    });
  }
}
