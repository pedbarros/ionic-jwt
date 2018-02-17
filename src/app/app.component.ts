import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";
import {HomePage} from "../pages/home/home";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
        platform.ready().then(() => {


            let jwtHelper = new JwtHelper();
            this.storage.get('token').then(token => {
                if (token) {
                    if (jwtHelper.isTokenExpired(token)) {
                        this.rootPage = LoginPage
                    } else {
                        this.rootPage = HomePage
                    }
                }else {
                    this.rootPage = LoginPage
                }

            })

            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

