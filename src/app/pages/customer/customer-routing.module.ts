import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'src/app/@core/guards/logged-in.guard';
import { ProductListComponent } from 'src/app/pages/customer/pages/product-list/product-list.component';
import { CustomerComponent } from './customer.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        component: CategoryListComponent,
      },
      {
        path: 'cart',
        component: CartPageComponent
      },
      {
        path: 'user',
        component: UserProfileComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: ':idCategory',
        component: ProductListComponent,
      },
      {
        path: ':idCategory/product/:idProduct',
        component: ProductDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
