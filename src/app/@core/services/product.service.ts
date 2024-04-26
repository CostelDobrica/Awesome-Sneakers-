import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, tap, map, Observable } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Product, ProductRequest, ProductRequestUpdate, ProductResponse } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor(private readonly http: HttpService) {}

  public get(): Observable<Product[]> {
    return this.http.get('/products').pipe(
      tap((products: Product[]) => {
        this.products$.next(products);
      })
    );
  }

  public getProductById(productId: string | null): Observable<Product> {
    return this.http.get(`/products/${productId}`);
  }

  public getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.http.get(`/products/?categoryId=${categoryId}`).pipe(
      tap((products: Product[]) => {
        this.products$.next(products);
      })
    );
  }

  public add(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post('/products', product);
  }

  public update(product: ProductRequestUpdate): Observable<ProductResponse> {
    return this.http.patch('/products', product);
  }

  public delete(productId: string): Observable<ProductResponse> {
    return this.http.delete(`/products/${productId}`);
  }

  public get getProducts(): BehaviorSubject<Product[]> {
    return this.products$;
  }
}
