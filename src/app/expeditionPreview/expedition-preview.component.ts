import { Component, OnInit } from '@angular/core';
import { UpcomingService } from '../services/upcoming.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expedition-preview',
  standalone: true,
  providers: [UpcomingService, DatePipe],
  imports: [HttpClientModule, CommonModule],
  templateUrl: './expedition-preview.component.html',
  styleUrl: './expedition-preview.component.scss',
})
export class ExpeditionPreviewComponent {
  upcomingData$: Observable<any> = this.upcomingService.loadedUpcomingData;

  constructor(
    private upcomingService: UpcomingService,
    private datePipe: DatePipe
  ) {}

  getDateRangeDisplay(startDateString: Date, endDateString: Date): string {
    let startDate = new Date(startDateString);
    let endDate = new Date(endDateString);
    const startFormat = 'dd';
    const endFormat =
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
        ? 'dd MMMM yyyy'
        : 'dd MMMM yyyy';
    return `${this.datePipe.transform(
      startDate,
      startFormat
    )} - ${this.datePipe.transform(endDate, endFormat)}`;
  }
}
