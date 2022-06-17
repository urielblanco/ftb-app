import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockchainRoutingModule } from './blockchain-routing.module';
import { BlockchainComponent } from './blockchain.component';
import { BlockchainService } from './blockchain.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [BlockchainComponent],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    BlockchainRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [BlockchainService],
})
export class BlockchainModule {}
