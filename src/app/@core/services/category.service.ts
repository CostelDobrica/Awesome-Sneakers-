import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpService } from '../api/http.service';
import { Category, CategoryRequest, CategoryRequestUpdate, CategoryResponse } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories$ = new BehaviorSubject<Category[]>([]);

  constructor(private readonly http: HttpService) {}

  public get(): Observable<Category[]> {
    return this.http.get('/categories').pipe(
      tap((categories: Category[]) => {
        this.categories$.next(categories);
      })
    );
  }

  public add(category: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post('/categories', category);
  }

  public edit(category: CategoryRequestUpdate): Observable<CategoryResponse> {
    return this.http.put('/categories', category);
  }

  public delete(idCategory: string): Observable<CategoryResponse> {
    return this.http.delete(`/categories/${idCategory}`);
  }

  public get getCategories(): BehaviorSubject<Category[]> {
    return this.categories$;
  }
}
