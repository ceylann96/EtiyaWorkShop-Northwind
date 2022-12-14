import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  controllerUrl:string =`${environment.apiUrl}/categories`;
  constructor(private httpClient: HttpClient) {}

  
  getList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.controllerUrl);
  }

  getById(id:number):Observable<Category>{
    return this.httpClient.get<Category>(`${this.controllerUrl}/${id}`);
}
update(request: Category): Observable<Category> {
  return this.httpClient.put<Category>(
    `${this.controllerUrl}/${request.id}`,
    request
  );
}
add(request:Category): Observable<Category> {
  return this.httpClient.post<Category>(this.controllerUrl,request)
}
delete(categoryId: number): Observable<Category> {
  return this.httpClient.delete<Category>(
    `${this.controllerUrl}/${categoryId}`
  );
}
}