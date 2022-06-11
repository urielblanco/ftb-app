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

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['state', 'description', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isAuthenticated: Observable<boolean>;

  documentsSubscription: Subscription;

  constructor(
    private navbarService: NavbarService,
    private router: Router,
    private authService: AuthService,
    private documentsService: DocumentsService,
    public dialog: MatDialog
  ) {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.navbarService.setModeNavigator('Documentos');
    // Assign the data to the data source for the table to render
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

  openDialog() {
    this.dialog.open(DocumentsDialog, {
      data: {
        animal: 'panda',
      },
    });
  }

  createDocument(): void {
    this.router.navigate(['/documents/create']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.documentsSubscription.unsubscribe();
  }
}

@Component({
  selector: 'qr-code-dialog',
  templateUrl: 'documents-dialog.html',
})
export class DocumentsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
