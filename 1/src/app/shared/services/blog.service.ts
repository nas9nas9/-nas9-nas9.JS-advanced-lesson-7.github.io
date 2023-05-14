import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlogRequest, IBlogResponce } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = environment.BACKEND_URL;
  private api = { blog: `${this.url}/blog` }

  constructor(private http: HttpClient) { }

  getAll(): Observable<IBlogResponce[]> {
    return this.http.get<IBlogResponce[]>(this.api.blog);
  }

  getOne(id: number): Observable<IBlogResponce> {
    return this.http.get<IBlogResponce>(`${this.api.blog}/${id}`)
  }

  create(post: IBlogRequest): Observable<IBlogResponce> {
    return this.http.post<IBlogResponce>(this.api.blog, post);
  }

  update(post: IBlogRequest, id: number): Observable<IBlogResponce> {
    return this.http.patch<IBlogResponce>(`${this.api.blog}/${id}`, post);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.blog}/${id}`);
  }

}
