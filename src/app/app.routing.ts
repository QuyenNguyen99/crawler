import { Routes, RouterModule } from '@angular/router';


export const AppRoutes: Routes = [
  {
    path: 'authenticate',
    loadChildren: './application/authenticate/authenticate.module#AuthenticateModule'
  },
  {
    path: '',
    redirectTo: '/admin/staffmanagement/index',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: './application/admin/admin.module#AdminModule'
  },
  {
    path: '**',
    redirectTo: '/admin/error',
    pathMatch: 'full',
  },
];
