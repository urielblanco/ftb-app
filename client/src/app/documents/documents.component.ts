import { Component, ViewChild, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NavbarService } from '../core/services/navbar.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { DocumentsService } from './documents.service';
import { DocumentsDialogComponent } from './documents-dialog/documents-dialog.component';

export interface DialogData {
  id: string;
  name: string;
}
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['state', 'description', 'actions'];
  dataSource: any;
  qrCode: string = 'hola';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isAuthenticated: Observable<boolean>;

  documentsSubscription: Subscription;

  constructor(
    private navbarService: NavbarService,
    private router: Router,
    public authService: AuthService,
    private documentsService: DocumentsService,
    public dialog: MatDialog
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.navbarService.setModeNavigator('Documentos');
  }

  ngOnInit(): void {
    this.documentsSubscription = this.documentsService
      .getDocuments()
      .subscribe((response: any) => {
        const documents = response.data.documents;
        console.log(documents);
        this.dataSource = new MatTableDataSource(documents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  openDialog(product: any) {
    this.dialog.open(DocumentsDialogComponent, {
      data: {
        id: product._id,
        name: product.technicalSheet.descriptionInput,
      },
    });
  }

  createDocument(): void {
    this.router.navigate(['/documents/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goDetail(document: any) {
    this.documentsService.documentSelected = document;
    this.router.navigate(['documents',document._id, 'edit']);
  }

  ngOnDestroy(): void {
    this.documentsSubscription.unsubscribe();
  }
}
