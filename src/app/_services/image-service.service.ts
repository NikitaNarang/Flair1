import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  [x: string]: any;

  constructor(private http: HttpClient) { }
  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', image);

    return this.HttpClient.post('/api/v1/image-upload', formData);
  }
}
