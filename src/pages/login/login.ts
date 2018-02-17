import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Storage} from "@ionic/storage";
import {Usuario} from "../model/usuario";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  usuario: Usuario = new Usuario()

  constructor(private navCtrl: NavController, private authService: AuthServiceProvider,
              private storage: Storage, private toastCtrl: ToastController) {
      this.usuario.user = "pedro"
      this.usuario.pass = "123"
  }

  login(){
    this.authService.login(this.usuario).subscribe( dados => {
      console.log(dados)
      if (dados.login === "true"){
          this.navCtrl.push(HomePage)
          this.storage.set('token', dados.access_token)


          /*console.log(
              jwtHelper.decodeToken(dados.access_token),
              jwtHelper.getTokenExpirationDate(dados.access_token),
              jwtHelper.isTokenExpired(dados.access_token)
          );*/
      }else{
          // console.log("Fica aí!")
          this.presentToast(dados.message)
      }
    })
  }

    presentToast(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

}
