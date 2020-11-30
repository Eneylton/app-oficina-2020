import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-produto-detalhe',
  templateUrl: 'produto-detalhe.html',
})
export class ProdutoDetalhePage {

  id:             number;
  ref:            string = "";
  barra:          string = "";
  cat:            string = "";
  fab:            string = "";
  foto:           string = "";
  modelo:         string = "";
  valor_compra:   string = "";
  valor_venda:    string = "";
  aplicacao:      string = "";
  marca:          string = "";
  qtd:            any    = "";
  codigo:         any    = "";
  cat_id:         any    = "";
  marca_id:       any    = "";
  fab_id:         any    = "";
  mod_id:         any    = "";
  url:            string = "";
  servidor:       any;

  constructor(public navCtrl: NavController,
  
    public navParams: NavParams,
    private serve: ServiceProvider) {
      
      this.url = serve.serve
    }
    
    ionViewDidLoad() {
    this.id                      = this.navParams.get('id');
    this.ref                     = this.navParams.get('ref');       
    this.codigo                  = this.navParams.get('codigo');
    this.barra                   = this.navParams.get('barra');
    this.cat                     = this.navParams.get('cat');
    this.fab                     = this.navParams.get('fab');
    this.modelo                  = this.navParams.get('modelo');
    this.marca                   = this.navParams.get('marca');
    this.foto                    = this.navParams.get('foto');
    this.valor_compra            = this.navParams.get('valor_compra');
    this.valor_venda             = this.navParams.get('valor_venda');
    this.aplicacao               = this.navParams.get('aplicacao');
    this.qtd                     = this.navParams.get('qtd');


    this.servidor = this.serve;
  }

}
