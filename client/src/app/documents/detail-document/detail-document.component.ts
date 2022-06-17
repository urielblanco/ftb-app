import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { DocumentsService } from '../documents.service';
import { allergensList } from '../../utils/allergens';

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.scss'],
})
export class DetailDocumentComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  documentId: string | null;
  document: any;
  allergensList = allergensList;
  history: any[] = [];

  constructor(
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private documentsService: DocumentsService
  ) {
    this.navbarService.setModeEditor('Detalle');
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.documentsService.getDocument(params.get('id')!)
        ),
        switchMap((response: any) => {
          this.document = response.data.document;

          return this.documentsService.getDocumentHistory(this.document.slug);
        })
      )
      .subscribe((response: any) => {
        this.history = response.data?.document?.history[0]?.versions;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
