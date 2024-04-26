import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/@core/models/category';
import { ProductRequest } from 'src/app/@core/models/product';
import { CategoryService } from 'src/app/@core/services/category.service';
import { EncodeImageFileService } from 'src/app/@core/services/encode-image-file.service';
import { ProductService } from 'src/app/@core/services/product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {
  private convertedImage!: string | null | ArrayBuffer;
  public categories: Category[] = [];
  public addProductForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    description: ['', [Validators.required]],
    productImage: ['', [Validators.required]],
    price: [0, [Validators.required]],
    quantity: [0, [Validators.required]],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: DialogRef,
    private readonly productService: ProductService,
    private readonly encodeImageFileService: EncodeImageFileService
  ) {}

  ngOnInit(): void {
    this.categoryService.get().subscribe();
    this.categoryService.getCategories.subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  public onChangeImage(event: EventTarget | null): void {

    const file = (event as HTMLInputElement).files?.[0];

    if (file) {
      this.encodeImageFileService
        .convertToBase64(file)
        ?.then((imageInBase64: string | ArrayBuffer | null): void => {
          this.addProductForm.controls['productImage'].setValue(file.name);
          this.convertedImage = imageInBase64;
        })
        .catch((error) => {
          throw Error(error);
        });
    }
  }

  public onAdd(): void {
    this.productService
      .add({ ...this.addProductForm.value, productImage: this.convertedImage } as ProductRequest)
      .subscribe({
        next: ({ message }) => {
          this.productService.get().subscribe();
          this.snackBar.open(message, '', { duration: 5000 });
          this.dialogRef.close();
        },
        error: ({ error }) => {
          this.snackBar.open(error.message, '', { duration: 5000 });
        },
      });
  }
}
