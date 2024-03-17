import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpcomingService } from '../services/upcoming.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { EmailService } from '../services/sendEmail.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  providers: [UpcomingService, EmailService],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  packages = ['bronze (5)', 'silver (10)', 'gold (15)'];

  constructor(
    public activeModal: NgbActiveModal,
    private upcomingService: UpcomingService,
    private emailService: EmailService
  ) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      jumps: new FormControl('', Validators.required),
      referral: new FormControl(''),
      tripId: new FormControl('', Validators.required),
      package: new FormControl('bronze (5)', Validators.required),
      discipline: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''), // Validators for phone number required
      comments: new FormControl(''),
      //policiesRead: new FormControl(false, Validators.required),
      dates: new FormControl(''),
    });

    /*
    this.signUpForm = new FormGroup({
      name: new FormControl('Theresa'),
      jumps: new FormControl(''),
      referral: new FormControl(''),
      tripId: new FormControl(''),
      package: new FormControl(''),
      discipline: new FormControl(''),
      email: new FormControl('theresa.tobollik@gmail.com'),
      phone: new FormControl(''), // Validators for phone number required
      comments: new FormControl(''),
      policiesRead: new FormControl(false),
      dates: new FormControl(''),
    });
        */
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.upcomingService
        .getRecordById(this.signUpForm.value.tripId)
        .subscribe((trip) => {
          const formValues = {
            name: this.signUpForm.value.name,
            jumps: this.signUpForm.value.jumps,
            referral: this.signUpForm.value.referral,
            tripId: trip?.fields.title,
            package: this.signUpForm.value.package,
            discipline: this.signUpForm.value.discipline ?? '-',
            email: this.signUpForm.value.email,
            phone: this.signUpForm.value.phone,
            comments: this.signUpForm.value.comments,
            policiesRead: this.signUpForm.value.policiesRead,
            dates: trip
              ? this.formatTripDates(
                  trip?.fields.start_date,
                  trip?.fields.end_date
                )
              : '-',
          };
          this.emailService.sendEmailToLambda(formValues);
          if (formValues.package === 'bronze (5)') {
            window.open(trip?.fields.bronze_payment_link, '_blank');
          }

          this.activeModal.close();
        });
    }
  }

  upcomingData$: Observable<any> = this.upcomingService.getUpcomingData();

  dismiss() {
    this.activeModal.dismiss();
  }

  formatTripDates(startDateStr: Date, endDateStr: Date): string {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const optionsWithoutYear: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
    };

    const optionsWithYear: Intl.DateTimeFormatOptions = {
      ...optionsWithoutYear,
      year: 'numeric',
    };

    const startDateFormatter = new Intl.DateTimeFormat(
      'en-US',
      optionsWithoutYear
    );

    const endDateFormatter = new Intl.DateTimeFormat('en-US', optionsWithYear);

    const formatDayWithSuffix = (date: Date) => {
      const day = date.getDate();
      let suffix = 'th';
      if (day === 1 || day === 21 || day === 31) suffix = 'st';
      else if (day === 2 || day === 22) suffix = 'nd';
      else if (day === 3 || day === 23) suffix = 'rd';

      return `${day}${suffix}`;
    };

    const formattedStartDate = startDateFormatter
      .format(startDate)
      .replace(/^\d+/, (match) => formatDayWithSuffix(startDate));
    const formattedEndDate = endDateFormatter
      .format(endDate)
      .replace(/^\d+/, (match) => formatDayWithSuffix(endDate));

    const formattedEndDateWithoutYear = formattedEndDate
      .split(' ')
      .slice(0, 2)
      .join(' ');

    return `${formattedStartDate} - ${formattedEndDateWithoutYear} ${endDate.getFullYear()}`;
  }
}
