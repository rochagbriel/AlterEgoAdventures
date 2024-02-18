import { Component } from '@angular/core';
import {
  NgbAccordionModule,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UpcomingService } from '../services/upcoming.service';
import { of, switchMap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ParagraphPipe } from '../pipes/paragraph.pipe';

@Component({
  selector: 'app-expedition',
  standalone: true,
  providers: [UpcomingService, DatePipe],
  imports: [
    NgbAccordionModule,
    CommonModule,
    NgbCarouselModule,
    HttpClientModule,
    ParagraphPipe,
  ],
  templateUrl: './expedition.component.html',
  styleUrl: './expedition.component.scss',
})
export class ExpeditionComponent {
  constructor(
    private upcomingService: UpcomingService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.expedition$.subscribe((x) => console.log(x));
  }

  expedition$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id');
      if (id) {
        return this.upcomingService.getRecordById(id);
      }
      this.router.navigate(['.']);
      return of(undefined);
    })
  );

  pictures$ = this.expedition$.pipe(
    switchMap((expedition) => {
      if (expedition && expedition.fields.additional_pictures) {
        return this.upcomingService.loadUpcomingPictures(
          expedition.fields.additional_pictures
        );
      } else {
        return of(null); // TODO add some fallback picture
      }
    })
  );

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
