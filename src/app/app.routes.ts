import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ReviewComponent } from './review/review.component';
import {HomeComponent} from "./home/home.component";
import { ModelsComponent } from './models/models.component';
import { StoresComponent } from './stores/stores.component';
export const routes: Routes = [
  { path: '', redirectTo: 'reviews', pathMatch: 'full' },
  { path: 'reviews', component: HomeComponent },
  { path: 'reviews/:grade', component: ProductComponent },
  { path: 'reviews/:grade/:id', component: ReviewComponent },
  // { path: 'stores', component: StoresComponent },
];
