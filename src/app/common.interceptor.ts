import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private postService: PostService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem("JWT")){
      const Auth=<string>localStorage.getItem("JWT");
      console.log(request.clone({setHeaders: {Auth}}));
      return next.handle(request.clone({setHeaders: {Auth}}));
    }
    return next.handle(request);
  }
}