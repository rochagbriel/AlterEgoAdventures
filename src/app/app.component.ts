import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FaqComponent } from './faq/faq.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpeditionPreviewComponent } from './expeditionPreview/expedition-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ExpeditionPreviewComponent,
    NgbAccordionModule,
    FaqComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AlterEgoAdventures';
}
