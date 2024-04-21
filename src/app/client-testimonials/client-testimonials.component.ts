import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TestimonialService } from '../services/testimonial.service';

@Component({
  selector: 'app-client-testimonials',
  standalone: true,
  providers: [TestimonialService],
  imports: [NgbAccordionModule, HttpClientModule, CommonModule],
  templateUrl: './client-testimonials.component.html',
  styleUrl: './client-testimonials.component.scss',
})
export class ClientTestimonialsComponent implements OnInit {
  ngOnInit(): void {}

  testimonials$: Observable<any> = this.testimonialService.getTestimonialData();

  constructor(private testimonialService: TestimonialService) {}
}
