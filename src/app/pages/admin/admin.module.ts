import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { EditCategoryModalComponent } from './components/edit-category-modal/edit-category-modal.component';
import { AddCategoryModalComponent } from './components/add-category-modal/add-category-modal.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { OrderComponent } from '../admin/components/order/order.component';


@NgModule({
  declarations: [
    AdminComponent,
    CategoriesComponent,
    ProductsComponent,
    OrdersComponent,
    EditCategoryModalComponent,
    AddCategoryModalComponent,
    CategoryComponent,
    ProductComponent,
    EditProductModalComponent,
    AddProductModalComponent,
    OrderComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, MatSelectModule],
})
export class AdminModule {}
