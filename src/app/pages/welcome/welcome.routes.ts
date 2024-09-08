import { Routes } from '@angular/router';
import { EmployeelistComponent } from '../../employee-list/employeelist.component';

export const WELCOME_ROUTES: Routes = [
  { path: '', component: EmployeelistComponent },
  { path: 'empList', component: EmployeelistComponent },
];
