import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryRequest } from 'src/app/@core/models/category';
import { CategoryService } from 'src/app/@core/services/category.service';
import { EncodeImageFileService } from 'src/app/@core/services/encode-image-file.service';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss'],
})
export class AddCategoryModalComponent {
  private convertedImage!: string | null | ArrayBuffer;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: DialogRef,
    private readonly encodeImageFileService: EncodeImageFileService
  ) {}

  public addCategoryForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    categoryImage: ['', [Validators.required]],
  });
  public onChangeImage(event: EventTarget | null): void {

    const file = (event as HTMLInputElement).files?.[0];

    if (file) {
      this.encodeImageFileService
        .convertToBase64(file)
        ?.then((imageInBase64: string | ArrayBuffer | null): void => {
          this.addCategoryForm.controls['categoryImage'].setValue(file.name);
          this.convertedImage = imageInBase64;
        })
        .catch((error) => {
          throw Error(error);
        });
    }
  }

  public onAdd(): void {
    this.categoryService
      .add({ ...this.addCategoryForm.value, categoryImage: this.convertedImage } as CategoryRequest)
      .subscribe({
        next: ({ message }) => {
          this.snackBar.open(message, '', { duration: 5000 });
          this.dialogRef.close();
          this.categoryService.get().subscribe();
        },
        error: ({ error }) => {
          this.snackBar.open(error.message, '', { duration: 5000 });
        },
      });
  }
}
