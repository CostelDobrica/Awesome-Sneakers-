import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './@core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canLoad: [AdminGuard],
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
