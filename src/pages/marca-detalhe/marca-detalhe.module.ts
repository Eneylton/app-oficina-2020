import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarcaDetalhePage } from './marca-detalhe';

@NgModule({
  declarations: [
    MarcaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(MarcaDetalhePage),
  ],
})
export class MarcaDetalhePageModule {}
