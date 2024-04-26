import { Injectable } from '@angular/core';

interface ItemSessionStorage {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public set(item: ItemSessionStorage): void {
    sessionStorage.setItem(item.key, item.value);
  }

  public get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public delete(key: string): void {
    sessionStorage.removeItem(key);
  }
}
