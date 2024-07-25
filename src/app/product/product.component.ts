import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnChanges{
  product: any;
  dalongReviewUrl: string = 'http://dalong.net/reviews/';
  @Input() productAcronym: any;
  grade: string ='';

  constructor (private contentfulService: ContentfulService, private route: ActivatedRoute){}

  ngOnInit( ){
    this.route.paramMap.subscribe(params => {
      this.productAcronym = params.get('grade');
      this.contentfulService.getProducts({'fields.acronym': this.productAcronym})
      .then(products => this.product = products[0])
    });
  }

  ngOnChanges(changes: SimpleChanges){
    // this.product=null;
    // this.contentfulService.getProducts({'fields.acronym': changes?.['productAcronym'].currentValue})
    // .then(products => this.product = products[0])
  }

  protected getReviewUrl (acronym: any, index: number): string {
    return acronym.toLowerCase() + (index+1);
    // return acronym.toLowerCase() + (index+1);
  }

  protected getModelKitName (index: number): string {
    return this.product?.fields?.modelKits.kits[index].text
  }
  protected getPreviewImage (index: number): string {
    let imgSrc = this.product?.fields?.modelKits.kits[index].src
    return this.dalongReviewUrl + imgSrc.slice(0,2)+'/'+ imgSrc
  }
  protected getProductLineName() : string {
    return this.product?.fields?.['scale'] + ' ' + this.product?.fields?.['grade'] + ' ' + this.product?.fields?.['name'] + ' (' + this.product?.fields?.['acronym'] + ')';
  }
}
