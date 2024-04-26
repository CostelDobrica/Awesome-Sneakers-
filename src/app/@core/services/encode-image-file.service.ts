import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EncodeImageFileService {
  private allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
  private limitSize = 4194304;
  constructor(private readonly snackBar: MatSnackBar) {}

  public convertToBase64(image: File): Promise<string | null | ArrayBuffer> | void {
    if (!this.allowed_types.includes(image.type)) {
      this.snackBar.open('The image file type must be jpeg, jpg or png', '', {
        duration: 5000,
      });
      return;
    }
    if (this.limitSize < image.size) {
      this.snackBar.open('The file size must be maximum 4 Megabyte', '', {
        duration: 5000,
      });
      return;
    }

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(image);

      fileReader.onload = (): void => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error): void => {
        reject(error);
      };
    });
  }
}
