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
    name: string
    constructor(private storage: Storage,
                private authService: AuthServiceProvider) {
    }

    ionViewDidLoad() {

    }

    ionViewDidEnter() {
        this.storage.get('token').then(token => {
            let jwtHelper = new JwtHelper();
            console.log(jwtHelper.decodeToken(token).data.name)
            this.name = jwtHelper.decodeToken(token).data.name
        })
    }

    logout() {
        this.authService.logout()
    }


}
