import { Routes } from '@angular/router';
import { EmployeelistComponent } from './employee-list/employeelist.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { PositionListComponent } from './position-list/position-list.component';
import { PositionAddComponent } from './position-add/position-add.component';
import { PositionUpdateComponent } from './position-update/position-update.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'empList', component: EmployeelistComponent },
  { path: 'empAdd', component: EmployeeAddComponent },
  { path: 'empUpdate/:employee_id', component: EmployeeUpdateComponent },
  { path: 'pstList', component: PositionListComponent },
  { path: 'pstAdd', component: PositionAddComponent },
  { path: 'pstUpdate/:position_id', component: PositionUpdateComponent },
  { path: 'welcome', component: WelcomeComponent },
];
