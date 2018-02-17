import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {JwtHelper} from "angular2-jwt";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {
    constructor(private storage: Storage,
                private authService: AuthServiceProvider) {
    }

    ionViewDidLoad() {

    }

    logout() {
        this.authService.logout()
    }

    validarToken() {
        this.storage.get('token').then(token => {
            let jwtHelper = new JwtHelper();
            console.log(token)
            console.log(jwtHelper.decodeToken(token))
        })
    }

}
