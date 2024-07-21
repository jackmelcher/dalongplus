import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ReviewComponent } from './review/review.component';
import {HomeComponent} from "./home/home.component";
import { ModelsComponent } from './models/models.component';
import { StoresComponent } from './stores/stores.component';
export const routes: Routes = [
  // { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'products/:grade', component: ProductListComponent },
  // { path: 'stores', component: StoresComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'review/:id', component: ReviewComponent },
];
