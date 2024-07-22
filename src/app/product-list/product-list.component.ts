import { Component, OnInit, Input } from '@angular/core';
import { Entry } from 'contentful';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { ContentfulService } from '../contentful.service';
import { url } from 'node:inspector';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  // define private class properties
  products: Entry<any>[] = [];
  products2: Entry<any>[] = [];
  currentProductAcronym: any;
  @Input() grades: string[] = [];
  urlMap: Map<string|null, string> = new Map<string,string> ([
    ['hg','High Grade'],
    ['mg','Master Grade'],
    ['pg','Perfect Grade'],
    ['eg','Entry Grade'],
    ['ng','No Grade'],
    ['fg','First Grade'],
    ['ag','Advanced Grade'],
    ['re','Reborn-One Hundred'],
    ['fm','Full Mechanics'],
    ['msm','Mega Size Model'],
    ['rg','Real Grade'],
    ['sd','Super-Deformed'],
    ['sg','Speed Grade'],
    ['hirm','Hi-Resolution Model'],
    ['ex','EX Model'],
    ['uchg','UC Hard Graph'],
    ['gc','Gundam Collection'],
    ['hy2m','Hyper Hybrid Model'],
  ]);

  constructor(private contentfulService: ContentfulService, private route: ActivatedRoute) { }

  // fetch data on init
  ngOnInit() {
    this.contentfulService.getProducts({'fields.grade[in]': this.getAllGrades(this.grades),
      order: 'fields.acronym'})
    .then(products => this.products = products)
  }

  protected getAllGrades(grades:string[]):string|undefined{
    let allGrades:string|undefined = '';
    for(let grade of grades){
      allGrades += this.urlMap.get(grade) + ',';
    }
    return allGrades;
  }

  protected getAcronym(index:number):any {
    return this.products[index]?.fields?.['acronym']?.toString().toLowerCase()
  }

  protected setDefaultProductline(){

  }
}
