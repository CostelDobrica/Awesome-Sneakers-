import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, CategoryRequestUpdate } from 'src/app/@core/models/category';
import { CategoryService } from 'src/app/@core/services/category.service';
import { EncodeImageFileService } from 'src/app/@core/services/encode-image-file.service';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
})
export class EditCategoryModalComponent {
  private convertedImage!: string | null | ArrayBuffer;

  public editCredentials = this.builder.group({
    name: [this.data.name, [Validators.required]],
    categoryImage: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<EditCategoryModalComponent>,
    private readonly builder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly sneakBar: MatSnackBar,
    private readonly encodeImageFileService: EncodeImageFileService,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {}

  public onChangeImage(event: EventTarget | null): void {

    const file = (event as HTMLInputElement).files?.[0];

    if (file) {
      this.encodeImageFileService
        .convertToBase64(file)
        ?.then((imageInBase64: string | ArrayBuffer | null): void => {
          this.editCredentials.controls['categoryImage'].setValue(file.name);
          this.convertedImage = imageInBase64;
        })
        .catch((error) => {
          throw Error(error);
        });
    }
  }

  public onEdit(): void {
    if (this.editCredentials.valid) {
      this.categoryService
        .edit({
          ...this.editCredentials.value,
          categoryImage: this.convertedImage || this.data.categoryImage,
          _id: this.data._id,
        } as CategoryRequestUpdate)
        .subscribe({
          next: ({ message }) => {
            this.categoryService.get().subscribe();
            this.sneakBar.open(message, '', {
              duration: 5000,
            });
            this.dialogRef.close();
          },

          error: ({ error }) => {
            this.sneakBar.open(error.message, '', {
              duration: 5000,
            });
          },
        });
    }
  }

  public onDelete(): void {
    this.categoryService.delete(this.data._id).subscribe({
      next: ({ message }) => {
        this.categoryService.get().subscribe();
        this.sneakBar.open(message, '', {
          duration: 5000,
        });
        this.dialogRef.close();
      },

      error: ({ error }) => {
        this.sneakBar.open(error.message, '', {
          duration: 5000,
        });
      },
    });
  }
}
