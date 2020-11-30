import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})

export class ProdutoListPage {

 
  limit: number = 2000;
  start: number = 0;
  url: string = "";

  produtos: any = [];

  todos: Array<{id:any, ref: string}>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private serve: ServiceProvider) {

      this.url = serve.serve;
}

ionViewDidLoad() {
  this.produtos = [];
  this.start = 0;
  this.listarProdutos();
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
    this.listarProdutos().then(() => {
      event.complete();
    })
  }, 1000);
}

listarProdutos() {

  return new Promise(resolve => {
    let body = {
      limit: this.limit,
      start: this.start,
      crud: 'listar-produtos'
    }


    this.serve.postData(body, 'produto.php').subscribe((data:any)=> {
     
      for (let i = 0; i < data.result.length; i++) {

        this.produtos.push({
 
              id:                data.result[i]["id"],
              ref:               data.result[i]["ref"],
              codigo:            data.result[i]["codigo"],
              barra:             data.result[i]["barra"],
              cat_id:            data.result[i]["cat_id"],
              marca_id:          data.result[i]["marca_id"],
              fab_id:            data.result[i]["fab_id"],
              mod_id:            data.result[i]["mod_id"],
              marca:             data.result[i]["marca"],
              cat:               data.result[i]["cat"],
              fab:               data.result[i]["fab"],
              modelo:            data.result[i]["modelo"],
              foto:              data.result[i]["foto"],
              valor_compra:      data.result[i]["valor_compra"],
              valor_venda:       data.result[i]["valor_venda"],
              aplicacao:         data.result[i]["aplicacao"],
              qtd:               data.result[i]["qtd"]

        });

      }

      })

      this.todos = this.produtos;

      resolve(true);

    });

}

getProdutos(ev: any) {
    
  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.produtos = this.todos.filter((prod) => {
      return (prod.ref.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })

  }else{
    this.produtos = this.todos;
  }
}

adicionar(){

  this.navCtrl.push('ProdutoInsertPage');
}

editar( id,
        codigo,
        ref,
        barra,
        cat_id,
        marca_id,
        fab_id,
        mod_id,
        cat,
        fab,
        modelo,
        foto,
        valor_compra,
        valor_venda,
        aplicacao,
        qtd
        
        ){

this.navCtrl.push('ProdutoEditPage', {

  id:              id,
  codigo:          codigo,
  ref:             ref,
  barra:           barra,
  cat_id:          cat_id,
  marca_id:        marca_id,
  fab_id:          fab_id,
  mod_id:          mod_id,
  cat:             cat,
  fab:             fab,
  modelo:          modelo,
  foto:            foto,
  valor_compra:    valor_compra,
  valor_venda:     valor_venda,
  aplicacao:       aplicacao,
  qtd:             qtd


})

}


detalhe( id,
  ref,
  codigo,
  barra,
  cat,
  fab,
  modelo,
  marca,
  foto,
  valor_compra,
  valor_venda,
  aplicacao,
  qtd  
  ){

this.navCtrl.push('ProdutoDetalhePage', {

id:              id,
ref:             ref,
codigo:          codigo,
barra:           barra,
cat:             cat,
fab:             fab,
marca:           marca,
modelo:          modelo,
foto:            foto,
valor_compra:    valor_compra,
valor_venda:     valor_venda,
aplicacao:       aplicacao,
qtd:             qtd,



})

}

delete(id){
  let body = {
    id: id,
    crud:'deletar'}
 
  this.serve.postData(body, 'produto.php').subscribe(data =>{
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
          this.navCtrl.setRoot('ProdutoListPage')
        }
      }
    ]
  });
  alert.present();
}

}