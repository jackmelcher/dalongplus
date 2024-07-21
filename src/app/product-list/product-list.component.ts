import { Component, OnInit, } from '@angular/core';
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
  currentProductAcronym: any;
  grade: string | null = '';
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
  defaultProductLineMap: Map<string|null, string> = new Map<string,string> ([
    ['hg','HGUC'],
    ['mg','MG'],
    ['pg','PG'],
    ['eg','EG'],
    ['ng','NG-MSG'],
    ['fg','FG'],
    ['ag','AG'],
    ['re','RE/100'],
    ['fm','SEED-FM'],
    ['msm','MSM'],
    ['rg','RG'],
    ['sd','MGSD'],
    ['sg','SG'],
    ['hirm','HiRM'],
    ['ex','EX'],
    ['uchg','UCHG'],
    ['gc','GC'],
    ['hy2m','H2YM-24'],
  ]);

  constructor(private contentfulService: ContentfulService, private route: ActivatedRoute) { }

  // fetch data on init
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.grade = params.get('grade');
      this.currentProductAcronym = this.defaultProductLineMap.get(this.grade);
      this.contentfulService.getProducts({'fields.grade': this.getGrade(this.grade),
                                        order: 'fields.acronym'})
      .then(products => this.products = products)
    });
  }

  protected getGrade(grade:string | null ):string{
    let gradeName = this.urlMap.get(grade);
    if(gradeName != undefined){
      return gradeName;
    }
    return '';
  }

  protected selectProductLine(productAcronym: any) {
    this.currentProductAcronym = productAcronym;
  }

  protected setDefaultProductline(){

  }
}
