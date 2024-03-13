import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { projects } from './portfolio.data';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  constructor(public dialog: MatDialog) {}

  openModal(project: { title: string; modalImageUrl: string; description: string }) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '90%',
      maxWidth: '800px',
      autoFocus: false,
      data: project
    });
   
    
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  projects = projects; 
  
}
