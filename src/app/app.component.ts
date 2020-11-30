import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/Storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  log:any;
  usuario_id:        any;
  nivel:             any;


  rootPage: any = 'LoginPage';

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private storage: Storage) {
    

    this.storage.get('session_storage').then((res)=>{

      this.log = res;
      this.usuario_id = this.log.nome;
      this.nivel = this.log.nivel;

      if(this.nivel === 'admin'){

        this.pages = [
          { title: 'Home', component:          'HomePage' },    
          { title: 'Produto', component:       'ProdutoListPage' },
          { title: 'Categotia', component:     'CategoriaListarPage' },     
          { title: 'Marcas', component:        'MarcaListarPage' },
          { title: 'Modelo', component:        'ModeloListarPage' },
          { title: 'Fabricante', component:    'FabriListarPage' },
          { title: 'Usuários', component:      'UsuarioListPage' },
    
          
        ];
  
      }else{
  
        this.pages = [
          { title: 'Home', component:          'HomePage' },    
          { title: 'Produto', component:       'ProdutoListPage' },
          { title: 'Usuários', component:      'UsuarioListPage' },
       
    
          
        ];
  
      }

    });

    this.initializeApp();
       
  }

  initializeApp() {

   
    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
