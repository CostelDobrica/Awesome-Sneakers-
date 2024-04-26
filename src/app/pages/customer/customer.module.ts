import { NgModule } from '@angular/core';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ProductComponent } from 'src/app/pages/customer/components/product/product.component';
import { ProductListComponent } from 'src/app/pages/customer/pages/product-list/product-list.component';
import { CategoryComponent } from 'src/app/pages/customer/components/category/category.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    CustomerComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent,
    CategoryComponent,
    CategoryListComponent,
    ProductDetailsComponent,
    CartPageComponent,
    CartProductComponent,
    OrderFormComponent,
    UserProfileComponent,
    UserDetailsComponent,
    OrderComponent,
  ],
  imports: [CustomerRoutingModule, SharedModule],
})
export class CustomerModule {}
