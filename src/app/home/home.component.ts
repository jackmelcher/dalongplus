import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import {ProductListComponent} from '../product-list/product-list.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productLinesMain: string[] = ['rg','eg', 're', 'pg','sd']
  productLinesOther: string[] = ['msm','hirm','ag','sg', 'ex','uchg','gc','hy2m']
}
