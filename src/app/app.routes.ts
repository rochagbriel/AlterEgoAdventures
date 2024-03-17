import { Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { ExpeditionPreviewComponent } from './expeditionPreview/expedition-preview.component';
import { ExpeditionComponent } from './expedition/expedition.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ClientTestimonialsComponent } from './client-testimonials/client-testimonials.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
  {
    path: '',
    component: ExpeditionPreviewComponent,
  },
  {
    path: 'expedition/:id',
    component: ExpeditionComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'client-testimonials',
    component: ClientTestimonialsComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  /*   {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  }, */
];
