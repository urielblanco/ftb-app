import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../core/services/navbar.service';
import { BlockchainService } from './blockchain.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss'],
})
export class BlockchainComponent implements OnInit, OnDestroy {
  proofs: any[];
  subscription: Subscription;
  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  constructor(
    private blockchainService: BlockchainService,
    private navbarService: NavbarService
  ) {
    this.navbarService.setModeNavigator('Registros');
  }

  ngOnInit(): void {
    this.subscription = this.blockchainService
      .getAllProofs()
      .subscribe((response: any) => (this.proofs = response.data.proofs));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openProof(uri: string) {
    window.open(uri, '_blank');
  }
}
