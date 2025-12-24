import { Routes } from '@angular/router';
import { Login } from '../pages/auth/login/login';
import { Base } from '../pages/components/base/base';
import { Dashboard } from '../pages/components/dashboard/dashboard';
import { Employees } from '../pages/components/employees/employees';
import { AuthGuard } from '../services/guard/auth.guard';
import { Attendance } from '../pages/components/attendance/attendance';
import { Advance } from '../pages/components/advance/advance';
import { Allowance } from '../pages/components/allowance/allowance';
import {Report} from '../pages/components/report/report'

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Base,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Dashboard },
      { path: 'employees', component: Employees },
      { path: 'attendance', component: Attendance },
      { path: 'advance', component: Advance },
      { path: 'allowance', component: Allowance },
      { path: 'report', component: Report },

    ],
  },
  { path: '**', redirectTo: '/login' },
];
