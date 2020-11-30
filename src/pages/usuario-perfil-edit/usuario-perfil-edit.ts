import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/Storage';


@IonicPage({})
@Component({
  selector: 'page-usuario-perfil-edit',
  templateUrl: 'usuario-perfil-edit.html',
})
export class UsuarioPerfilEditPage {

  
  log: any;
  nome: string;
  email: string;
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.nome = this.log.nome;
      this.email = this.log.email;
    

    });
  }

  selectText(event){
    event.target.Select();
  }

  salvar(){

    let body = {

      id: this.log.id,
      nome: this.nome, 
      email: this.email,

      crud: 'editar-perfil' 
    }

    this.serve.postData(body, 'perfil.php').subscribe(data => {
    
      this.log.nome = this.nome;
      this.log.email = this.email;
      this.storage.set('session_storage', this.log);

      this.navCtrl.push('UsuarioPerfilPage');

      const toast = this.toastyCrtl.create({
        message:'Atualização Realizada !!',
        duration:3000
      });
      toast.present();
      

    });

  }

}