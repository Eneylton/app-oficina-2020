
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-usuario-insert',
  templateUrl: 'usuario-insert.html',
})
export class UsuarioInsertPage {

  nome: string = "";
  email: string = "";
  usuario: string = "";
  senha: string = "";
  confirmar: string = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  cadastrar() {

    if (this.nome == "") {

      const toast = this.toastyCrtl.create({
        message: 'O campo nome é Obrigatório',
        duration: 3000
      });
      toast.present();

    } else if (this.usuario == "") {

      const toast = this.toastyCrtl.create({
        message: 'O campo usuário é Obrigatório',
        duration: 3000
      });
      toast.present();

    } else if (this.senha == "") {

      const toast = this.toastyCrtl.create({
        message: 'O campo Senha é Obrigatório',
        duration: 3000
      });
      toast.present();

    } else if (this.senha != this.confirmar) {

      const toast = this.toastyCrtl.create({
        message: 'A senha que você digitou está diferente !',
        duration: 3000
      });
      toast.present();

    } else {

      let body = {

        nome: this.nome,
        email: this.email,
        usuario: this.usuario,
        senha: this.senha,
        crud: 'adicionar-usuario'
      };

      this.serve.postData(body, 'usuarios.php').subscribe(data => {

        this.showInsertOk();

      });

    }

  }


  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.navCtrl.setRoot('UsuarioListPage')
          }
        }
      ]
    });
    alert.present();
  }

}
