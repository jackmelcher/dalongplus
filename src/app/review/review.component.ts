import { Component, Input } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input() id: string | null = '';
  modelKit: any;
  protected boxImage:number = 0;
  protected runnersImage:number = 0;
  protected manualImage:number = 0;
  protected runnerImage:number = 0;
  protected reviewImage:number = 0;
  protected extraImage:number = 0;
  protected review = {link:'',header:{productline:'',codeName:'',fullName:'',releaseDate:'',price:''},review:[{images:[],text:''}],info:[]};
  protected dalongImageUrl:string = '';
  protected partsImage:string[] = []
  private dalongUrl:string = 'http://dalong.net/reviews/';

  constructor(private contentfulService: ContentfulService,private route: ActivatedRoute) { }
  
  // fetch data on init
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.contentfulService.getModelKits({'fields.id': this.id})
    .then(modelKits => {this.modelKit = modelKits[0]; this.initVariables()});
  }

  initVariables(){
    this.reviewImage = parseInt(this.modelKit?.fields?.['dalongPicsReview']?.[0]);
    if(this.modelKit?.fields?.['dalongPicsReview']?.length > 2){
      this.extraImage = parseInt(this.modelKit?.fields?.['dalongPicsReview']?.[1]);
    }

    this.boxImage = parseInt(this.modelKit?.fields?.['dalongPicsInfo']?.[0]);
    this.runnersImage = parseInt(this.modelKit?.fields?.['dalongPicsInfo']?.[1]);
    this.manualImage = parseInt(this.modelKit?.fields?.['dalongPicsInfo']?.[2]);
    this.runnerImage = parseInt(this.modelKit?.fields?.['dalongPicsInfo']?.[3]);
    
    this.dalongImageUrl = this.modelKit?.fields?.productLine?.fields?.dalongImage.replaceAll("$",this.modelKit?.fields?.dalongId);

    if(this.modelKit?.fields?.['dalongParts'] != undefined){
      this.partsImage = this.modelKit?.fields?.['dalongParts'];
    }

    this.review = this.modelKit?.fields?.['review'];
  }

  protected getBoxImages(): string {
    
    return this.dalongUrl + this.dalongImageUrl + 'box' + '.jpg';
  }

  protected getRunnersImages(index: number): string {
    if(index > 0){
      return this.dalongUrl + this.dalongImageUrl + 'runner' + (index+1) + '.jpg';
    }
    return this.dalongUrl + this.dalongImageUrl + 'runner' + '.jpg';
  }

  protected getManualImages(index: number): string {
    if(this.modelKit?.fields?.['id'].includes("hguc001")) {
      return this.dalongUrl + this.dalongImageUrl + 'm000' + (index+1) + '.JPG';
    }
    return this.dalongUrl + this.dalongImageUrl + 'm000' + (index+1) + '.jpg';
  }

  protected getRunnerImages(index: number): string {
    return this.dalongUrl + this.dalongImageUrl + 'r0' + (index+1) + '.jpg';
  }

  protected getReviewImages(index: number): string {
    return this.dalongUrl + this.dalongImageUrl + (index+1) + '.jpg';
  }

  protected getExtraImages(index: number): string {
    let extra:string = '0';
    return this.dalongUrl + this.dalongImageUrl + extra.repeat(index+1) + '.jpg';
  }

  protected getPartsImages(index: number): string{
    return this.dalongUrl + this.dalongImageUrl + this.partsImage[index] + '.jpg';
  }


  protected getDalongLink (): string {
    return this.review.link;
  }
  protected getReview(): string {
    return JSON.stringify(this.review);
  }
  protected getHeader(): string {
    return this.review.header.productline + ' ' + this.review.header.codeName+ ' ' + this.review.header.fullName;
  }
  protected getReleaseDate(): string {
    return this.review.header.releaseDate;
  }
  protected getPrice(): string {
    return this.review.header.price;
  }
}
