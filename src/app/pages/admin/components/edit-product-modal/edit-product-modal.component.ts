import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/@core/models/category';
import { Product, ProductRequestUpdate } from 'src/app/@core/models/product';
import { CategoryService } from 'src/app/@core/services/category.service';
import { EncodeImageFileService } from 'src/app/@core/services/encode-image-file.service';
import { ProductService } from 'src/app/@core/services/product.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  private convertedImage!: string | null | ArrayBuffer;
  public categories: Category[] = [];
  public editProductForm = this.formBuilder.group({
    name: [this.data.name, [Validators.required]],
    categoryId: [this.data.category._id, [Validators.required]],
    description: [this.data.description, [Validators.required]],
    productImage: [''],
    price: [this.data.price, [Validators.required]],
    quantity: [this.data.quantity, [Validators.required]],
  });

  constructor(
    private readonly categoryService: CategoryService,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<EditProductModalComponent>,
    private readonly productService: ProductService,
    private readonly encodeImageFileService: EncodeImageFileService,
    @Inject(MAT_DIALOG_DATA) public data: Product
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
          this.editProductForm.controls['productImage'].setValue(file.name);
          this.convertedImage = imageInBase64;
        })
        .catch((error) => {
          throw Error(error);
        });
    }
  }

  public onEdit(): void {
    if (this.editProductForm.valid) {
      this.productService
        .update({
          ...this.editProductForm.value,
          productImage: this.convertedImage || this.data.productImage,
          _id: this.data._id,
        } as ProductRequestUpdate)
        .subscribe({
          next: ({ message }) => {
            this.productService.get().subscribe();
            this.snackBar.open(message, '', {
              duration: 5000,
            });
            this.dialogRef.close();
          },
          error: ({ error }) => {
            this.snackBar.open(error.message, '', {
              duration: 5000,
            });
          },
        });
    }
  }

  public onDelete(): void {
    this.productService.delete(this.data._id).subscribe({
      next: ({ message }) => {
        this.productService.get().subscribe();
        this.snackBar.open(message, '', {
          duration: 5000,
        });
        this.dialogRef.close();
      },
      error: ({ error }) => {
        this.snackBar.open(error.message, '', {
          duration: 5000,
        });
      },
    });
  }
}
