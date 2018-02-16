import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Usuario} from "../../pages/model/usuario";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  login(usuario: Usuario): Observable<any>{
      let data = JSON.stringify({
          user: usuario.user,
          pass: usuario.pass
      });

      return this.http.post<any>("http://localhost/pedro/web/index.php/auth", data, {
          //headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
          //params: new HttpParams().set('id', '3'),
      })
  }

}
