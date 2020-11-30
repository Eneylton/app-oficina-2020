import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeloDetalhePage } from './modelo-detalhe';

@NgModule({
  declarations: [
    ModeloDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(ModeloDetalhePage),
  ],
})
export class ModeloDetalhePageModule {}
