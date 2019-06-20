import { Routes } from "@angular/router/src/config";
import { AdminComponent } from './admin.component';

export const AdminRouter: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'staffmanagement/index', pathMatch: 'full' },
            { path: 'rolefull', loadChildren: './rolefull/rolefull.module#RolefullModule' },
            { path: 'staffmanagement', loadChildren: './staff-management/staff-management.module#StaffManagementModule' },
            { path: 'common', loadChildren: './settings-build/common.admin.module#CommonAdminModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'job', loadChildren: './job/job.module#JobModule' },
        ]
    },
    {
        path: '**',
        component: AdminComponent,
    },
];