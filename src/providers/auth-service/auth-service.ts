import {HttpClient} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Usuario} from "../../pages/model/usuario";
import {catchError} from "rxjs/operators";
import 'rxjs/add/observable/throw';
import {Storage} from "@ionic/storage";
import {LoginPage} from "../../pages/login/login";
import {App} from "ionic-angular";

@Injectable()
export class AuthServiceProvider {

    constructor(public http: HttpClient, private inj: Injector, private storage: Storage, public app: App) {
        // console.log('Hello AuthServiceProvider Provider');
    }

    login(usuario: Usuario): Observable<any> {
        let data = JSON.stringify({
            user: usuario.user,
            pass: usuario.pass
        });

        return this.http.post<any>("http://localhost/servidor-jwt/web/index.php/auth", data, {
            //headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
            //params: new HttpParams().set('id', '3'),
        }).pipe(
            catchError(this.handleError)
        )
    }

    logout() {
        let nav = this.app.getActiveNav();
        this.storage.remove('token')
        nav.setRoot(LoginPage);
    }

    protected handleError(error: Response | any) {
        // console.error(error.statusText);
        return Observable.throw(error); // <= B
    }

}
