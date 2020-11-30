import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-usuario-edit',
  templateUrl: 'usuario-edit.html',
})


export class UsuarioEditPage {

  id:             number;
  nome:           string ="";
  email:          string ="";
  usuario:        string ="";
  senha:          string ="";

  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {
}



ionViewDidLoad() {

  this.id         = this.navParams.get('id');
  this.nome       = this.navParams.get('nome');
  this.email      = this.navParams.get('email');
  this.usuario    = this.navParams.get('usuario');
  this.senha      = this.navParams.get('senha');
}

editar(){

  let body ={
    id:        this.id,
    nome:      this.nome,
    email:     this.email,
    usuario:   this.usuario,
    senha:     this.senha,

    crud: 'usuario-editar'
  };

  this.serve.postData(body, 'usuarios.php').subscribe((data:any) =>{
  
    this.showInsertOk();
  
  });
}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Seu Registro foi Atualizado',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('UsuarioListPage');
        }
      }
    ]
  });
  
  alert.present();
}

}
