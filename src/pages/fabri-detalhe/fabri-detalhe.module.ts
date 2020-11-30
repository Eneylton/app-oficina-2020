import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FabriDetalhePage } from './fabri-detalhe';

@NgModule({
  declarations: [
    FabriDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(FabriDetalhePage),
  ],
})
export class FabriDetalhePageModule {}
