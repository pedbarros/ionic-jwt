import { Component } from '@angular/core';
import {AlertController, NavController } from 'ionic-angular';
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
              private storage: Storage, private alertaCtrl: AlertController) {
      this.usuario.user = "pedro"
      this.usuario.pass = "123"
  }

  login(){
    this.authService.login(this.usuario).subscribe( dados => {
        this.presentAlerta(JSON.stringify(dados))
      if (dados.login === "true"){
          this.navCtrl.push(HomePage)
          this.storage.set('token', dados.access_token)
      }else{
          // console.log("Fica aí!")
          this.presentAlerta(dados.message)
      }
    })
  }

    presentAlerta(msg: string) {
        let alerta = this.alertaCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });

        alerta.onDidDismiss(() => {
            console.log('Dismissed alerta');
        });

        alerta.present();
    }

}
