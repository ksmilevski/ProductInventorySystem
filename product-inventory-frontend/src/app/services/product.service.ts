import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5272/api/product';

  constructor(private http: HttpClient) { }

  getAllProducts(
    searchTerm: string = '',
    page: number = 1,
    pageSize: number = 6,
    sortBy: string = 'name',
    sortOrder: string = 'asc'
  ): Observable<any> {
    let params = new HttpParams()
      .set('name', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http.get<any>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  
  addProduct(product: any, file?: File): Observable<any> {
    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));
    if (file) formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData);
  }

  
  updateProduct(id: number, product: any, file?: File): Observable<any> {
    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));
    if (file) formData.append('file', file);

    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
