import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-produto-edit',
  templateUrl: 'produto-edit.html',
})
export class ProdutoEditPage {

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
    qtd:            any    = "";
    codigo:         any    = "";
    cat_id:         any    = "";
    marca_id:       any    = "";
    fab_id:         any    = "";
    mod_id:         any    = "";
   

    parm: any;

    marcas: any = [];
    modelos: any = [];
    categorias: any = [];
    fabricantes: any = [];

    base64Image : string = "";
    cameraData: string;

    url:string;

  
  constructor(public navCtrl: NavController,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams,
    private serve: ServiceProvider,
    public toastyCrtl: ToastController,
    public alertCtrl: AlertController) {

      this.url = serve.serve;
}


ionViewDidLoad() {
  this.listarModelo();
  this.listarMarca();
  this.listarFabricante();
  this.listarCategoria();


  this.id                      = this.navParams.get('id');
  this.codigo                  = this.navParams.get('codigo');       
  this.ref                     = this.navParams.get('ref');
  this.barra                   = this.navParams.get('barra');
  this.cat_id                  = this.navParams.get('cat_id');
  this.marca_id                = this.navParams.get('marca_id');
  this.fab_id                  = this.navParams.get('fab_id');
  this.mod_id                  = this.navParams.get('mod_id');
  this.cat                     = this.navParams.get('cat');
  this.fab                     = this.navParams.get('fab');
  this.modelo                  = this.navParams.get('modelo');
  this.foto                    = this.navParams.get('foto');
  this.valor_compra            = this.navParams.get('valor_compra');
  this.valor_venda             = this.navParams.get('valor_venda');
  this.aplicacao               = this.navParams.get('aplicacao');
  this.qtd                     = this.navParams.get('qtd');
 

  this.marcas = [];
  this.modelos = [];
  this.fabricantes = [];
  this.categorias = [];

}

listarMarca() {
    
  let body = {
    
    crud:'listar-marc'
  }

  this.serve.postData(body,'marca.php').subscribe((data:any)=>{

    for(let item of data.result){
        this.marcas.push({
        id:item.id,
        descricao:item.descricao

      })
     
      
    }
  })
  

}

listarModelo() {
  
  let body = {
    marca_id:this.marca_id,
    crud:'listar-model'
  }

  this.serve.postData(body,'modelo.php').subscribe((data:any)=>{

    for(let item of data.result){
        this.modelos.push({
        id:item.id,
        descricao:item.descricao
      })

   
    }
 })

}

 listarFabricante() {

   let body = {

     crud:'listar-fabri'
   }
 this.serve.postData(body,'fabricante.php').subscribe((data:any)=>{
   for(let item of data.result){
         this.fabricantes.push({
         id:item.id,
         descricao:item.descricao
       })

     }
   })
}


 listarCategoria() {

   let body = {

     crud:'listar-cate'
   }
 this.serve.postData(body,'categoria.php').subscribe((data:any)=>{
   for(let item of data.result){
         this.categorias.push({
         id:item.id,
         descricao:item.descricao
       })

     }
   })
}

presentActionSheet() {
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Abrir Midia',
    buttons: [
      {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          this.abrirCamrera();
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          this.abrirGaleria();
        }

      }
    ]
  });

  actionSheet.present();
}


abrirCamrera() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:650,
    targetHeight:650,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {

    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

}


abrirGaleria() {

  const options: CameraOptions = {
    quality: 100,
    targetWidth:650,
    targetHeight:650,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.cameraData = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {

  });

}


editar(){

if(this.cameraData === undefined){

  let body ={
    id:              this.id,
    codigo:          this.codigo,
    barra:           this.barra,
    referencia:      this.ref,
    foto:            this.foto,
    marca_id:        this.marca_id,
    modelo_id:       this.mod_id,
    categoria_id:    this.cat_id,
    fabricante_id:   this.fab_id,
    valor_compra:    this.valor_compra,
    valor_venda:     this.valor_venda,
    aplicacao:       this.aplicacao,
    qtd:             this.qtd,
    crud: 'editar-produto2'
  };

  this.serve.postData(body, 'produto.php').subscribe((data:any) =>{
  
    this.showInsertOk();
  
  });



}else{

  let body ={
    id:              this.id,
    codigo:          this.codigo,
    barra:           this.barra,
    referencia:      this.ref,
    foto:            this.cameraData,
    marca_id:        this.marca_id,
    modelo_id:       this.mod_id,
    categoria_id:    this.cat_id,
    fabricante_id:   this.fab_id,
    valor_compra:    this.valor_compra,
    valor_venda:     this.valor_venda,
    aplicacao:       this.aplicacao,
    qtd:             this.qtd,
    crud: 'editar-produto'
  };

  this.serve.postData(body, 'produto.php').subscribe((data:any) =>{
  
    this.showInsertOk();
  
  });

}


}

showInsertOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Registro foi Atualizado',
    enableBackdropDismiss: false,
    buttons: [
      {
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot('ProdutoListPage');
        }
      }
    ]
  });
  alert.present();
}

}