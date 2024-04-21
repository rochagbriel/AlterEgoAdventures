import { Component } from '@angular/core';
import { UpcomingService } from '../services/upcoming.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expedition-preview',
  standalone: true,
  providers: [UpcomingService],
  imports: [HttpClientModule, CommonModule],
  templateUrl: './expedition-preview.component.html',
  styleUrl: './expedition-preview.component.scss',
})
export class ExpeditionPreviewComponent {
  upcomingData$: Observable<any> = this.upcomingService.loadedUpcomingData;

  constructor(private upcomingService: UpcomingService) {}
}
