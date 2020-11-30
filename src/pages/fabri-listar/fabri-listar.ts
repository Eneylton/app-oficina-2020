import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-fabri-listar',
  templateUrl: 'fabri-listar.html',
})

export class FabriListarPage {

  limit: number = 10;
  start: number = 0;

  fabricantes: any = [];

  url: string = "";

  todos: Array<{id:any, descricao: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.serve;
}

ionViewDidLoad() {
  this.fabricantes = [];
  this.start = 0;
  this.listarmarcas();
}

doRefresh(event) {

  setTimeout(() => {

    this.ionViewDidLoad();
    event.complete();

  }, 1000);
}

loadData(event: any) {
  this.start += this.limit;

  setTimeout(() => {
    this.listarmarcas().then(() => {
      event.complete();
    })
  }, 1000);
}

listarmarcas() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-fabricantes'
    };
    this.serve.postData(body, 'fabricante.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.fabricantes.push({
              id:            data.result[i]["id"],
              descricao:     data.result[i]["descricao"],
              foto:          data.result[i]["foto"],

             
         
        });

      }

      })

      this.todos = this.fabricantes;

      resolve(true);

    });

}

getMarcas(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.fabricantes = this.todos.filter((marc) => {
      return (marc.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }else{
    this.fabricantes = this.todos;
  }
}



adicionar(){

  this.navCtrl.push('FabriInsertPage');
}

editar(id, descricao,foto){

  this.navCtrl.push('FabriEditPage', {
    id:         id,
    descricao:  descricao,
    foto:       foto

  })

}

detalhe(id, descricao,foto){

  this.navCtrl.push('FabriDetalhePage', {
    id:         id,
    descricao:  descricao,
    foto:       foto

  })

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'fabricante.php').subscribe(data =>{
    this.showInsertOk();
  });

}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Registro Excluido',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('FabriListarPage')
        }
      }
    ]
  });
  alert.present();
}

}


