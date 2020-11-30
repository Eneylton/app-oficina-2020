import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, App } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-usuario-detalhes',
  templateUrl: 'usuario-detalhes.html',
})
export class UsuarioDetalhesPage {

  log:any;
  membros:any;

  id:        number;
  nome:      string ="";
  email:     string ="";
  usuario:   string ="";

  senha:     string ="";


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    private storage: Storage,
    private appCtrol:  App,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter(){

    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.load();
    

    });

  }

  load(){
    let body ={
      id:this.log.id,
      senha:this.log.senha,
      nome:this.log.nome,
      sobrenome:this.log.sobrenome,
      telefone:this.log.telefone,
      email:this.log.email,
      usuario:this.log.senha,
      
      crud:'listar-perfil'
    }

    this.serve.postData(body, 'perfil.php').subscribe((data:any) => {
    
      this.membros = data.profiles;
      this.nome = data.profiles["nome"];
      this.email = data.profiles["email"];
      this.usuario = data.profiles["usuario"];
      
      

    });

  }

  openPerfil(){
    this.navCtrl.push('PerfilEditPage');
  }

  logaout(){
    this.storage.clear();
    this.appCtrol.getRootNav().setRoot('LoginPage');

    const toast = this.toastyCrtl.create({
      message:'Você Encerrou sua sessão !!',
      duration:3000
    });
    toast.present();

  }

}