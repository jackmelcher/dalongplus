import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentfulService } from '../contentful.service';
import { Entry } from 'contentful';
import { RouterModule } from '@angular/router';
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
  // modelKits: Entry<any>[] = [];
  indexAddZeroArray: string[] = ['MG','HP','AG','RG','HGBD:R','HGBD','HGBF','HGBC','HGRG','RE/100','HGGTO','HGGT','HGSeed','HGSeedR','Seed144','SeedD144','00-100','HG00','HGAGE','HGIBO','EX','H2YM-MG','NG-MSG','CC','NG-MSV','NG-Z','NG-ZZ','NG-CCA','NG-V','NG-W','NG-G','NG-X'];
  dalongReviewUrl: string = 'http://dalong.net/reviews/';
  @Input() productAcronym: any;

  constructor (private contentfulService: ContentfulService){}

  // ngOnInit() {
  //   this.contentfulService.getProducts({'fields.acronym': this.productAcronym})
  //   .then(products => this.product = products[0])
  //   this.contentfulService.getModelKits({'fields.productLine.sys.contentType.sys.id':'productLine',
  //                                       'fields.productLine.fields.acronym': this.productAcronym,
  //                                       order: 'fields.id'})
  //   .then(modelKits => this.modelKits = modelKits)
  // }

  ngOnChanges(changes: SimpleChanges){
    this.product=null;
    this.contentfulService.getProducts({'fields.acronym': changes?.['productAcronym'].currentValue})
    .then(products => this.product = products[0])
  }

  // Convert this function so a get index string for dalong review url
  protected getDalongPreviewImage (dalongPreviewImage: any, acronym: any, index: number): string {
    // Product line starts at #0
    if(acronym != 'HGBC' && acronym != 'Seed144'){
      index++;
    }
    if(acronym == 'HGHG' && index == 1){
      index = 93;
    }
    if(acronym == 'HGPG'){
      if(index > 1)
        index = index + 3;
      if(index > 5)
        index = index + 1;
      if(index > 10)
        index = index + 1;
      if(index > 12)
        index = index + 1;
      if(index > 15)
        index = index + 1;
    }
    if(acronym == 'HP'){
      if(index > 1)
        index = index + 2;
    }
    if( dalongPreviewImage == null){
      return "";
    }
    let temp =  dalongPreviewImage;
    if(acronym == 'HGUC'){
      switch (index) {
        case 2:
        case 4:
        case 9:
        case 38:
        case 39:
        case 48:
          temp = temp.replaceAll('_2','_3');
          break;
        case 28:
          temp = temp.replaceAll('_2','_9');
          break;
        case 41:
          temp = temp.replaceAll('_2','_1');
          break;
        case 50:
          temp = temp.replaceAll('_2','_26');
      }
      if(index == 121){
        temp = 'hg/hgcata/hex1s.jpg';
      }
      else if(index > 52){
        temp = 'hg/hgcata/h$s.jpg';
      }
      else if(index > 47 && index != 50){
        temp = temp.substr(0, temp.lastIndexOf('_')+1) + '0' + temp.substr(temp.lastIndexOf('_')+1)
      }
      else if(index < 10){
        temp =  temp.replaceAll('$','0' + index)
      }
      temp =  temp.replaceAll('$',index)
      return this.dalongReviewUrl + temp;
    }

    // dalong links add a 0 to first 9 products.
    if(this.indexAddZeroArray.includes(acronym)){
      if(index < 10){
        temp =  temp.replaceAll('$','0' + index);
        return this.dalongReviewUrl + temp;
      }
    }
    if(acronym == 'EG'){
      if(index == 1){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$', '01')
      }
      if(index == 2){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$', '01L')
      }
      if(index == 3){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$', '01f')
      }
      if(index == 4){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$', '04')
      }
      if(index == 5){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$', '04L')
      }
      if(index == 6){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$', '11').replaceAll('egx', 'egn')
      }
    }
    if(acronym == 'MG' && (index == 101 || index == 102)){
      let linkSplit = dalongPreviewImage.split('$');
      return this.dalongReviewUrl +  linkSplit[0] + 'g' + index + linkSplit[1];
    }
    if(acronym == 'PG'){
      if(index < 10){
        temp =  temp.replaceAll('$','0' + index + '_')
        return this.dalongReviewUrl + temp;
      }
      if(index == 10){
        temp =  temp.replaceAll('$',index + '_')
        return this.dalongReviewUrl + temp;
      }
    }
    if(acronym == 'HGGB' && index == 1){
      return this.dalongReviewUrl + dalongPreviewImage.replaceAll('gb','bg').replaceAll('$',index);
    }
    if(acronym == 'HGGBM'){
      index = index + 2
    }
    if(acronym == 'MSM' && (index == 4 || index == 5)){
      return this.dalongReviewUrl + dalongPreviewImage.replaceAll('etc/etc','age/ag').replaceAll('$',index);
    }
    if(acronym == 'RD'){
      if(index == 1){
        return this.dalongReviewUrl + 'seed/seedcata/s60_1_2s.jpg';
      }
      if(index == 2){
        return this.dalongReviewUrl + 'seed/seedcata/s60_2_01s.jpg';
      }
      if(index == 3){
        return this.dalongReviewUrl + 'seed/seedcata/s60_3_02s.jpg';
      }
    }
    if(acronym == 'Seed100'){
      if(index == 4 || index == 5 || index == 12){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$',index).replaceAll('_2','_02');
      }
      if(index == 13){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$','113').replaceAll('_2','');
      }
    }
    if(acronym == 'SeedD100'){
      if(index > 14){
        return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$','1' + index).replaceAll('_2','_02');
      }
    }
    // Only affects preview image
    if(acronym == 'GC'){
      if(index == 1){
        return this.dalongReviewUrl + 'etc/etccata/400wbs.jpg';
      }
      if(index == 2){
        return this.dalongReviewUrl + 'etc/etccata/400m1s.jpg';
      }
      if(index == 3){
        return this.dalongReviewUrl + 'etc/etccata/400qs.jpg';
      }
      if(index == 4){
        return this.dalongReviewUrl + 'etc/etccata/400bzs.jpg';
      }
      if(index == 5){
        return this.dalongReviewUrl + 'etc/etccata/400m2s.jpg';
      }
      if(index == 6){
        return this.dalongReviewUrl + 'etc/etccata/400mss.jpg';
      }
      if(index == 7){
        return this.dalongReviewUrl + 'etc/etccata/400azs.jpg';
      }
    }
    if(acronym == 'H2YM-60'){
      if(index == 2){
        index++;
      }
    }
    return this.dalongReviewUrl + dalongPreviewImage.replaceAll('$',index);
  }

  protected getReviewUrl (acronym: any, index: number): string {
    // if(acronym != null){
    //   if(index+1 < 10)
    //     return acronym.toLowerCase() + '00' + (index+1) ;
    //   if(index+1 < 100)
    //     return acronym.toLowerCase() + '0' + (index+1) ;
      return acronym.toLowerCase() + (index+1);
    // }
    // return '';
  }

  protected getModelKitName (index: number): string {
    return this.product?.fields?.modelKits.kits[index].text
  }
  protected getPreviewImage (index: number): string {
    let imgSrc = this.product?.fields?.modelKits.kits[index].src
    return this.dalongReviewUrl + imgSrc.slice(0,2)+'/'+ imgSrc
  }
  protected getProductLineName() : string {
    return this.product?.fields?.['scale'] + ' ' + this.product?.fields?.['name'] + ' (' + this.product?.fields?.['acronym'] + ')';
    // return this.product?.fields?.['scale'] + ' ' + this.product?.fields?.['grade'] + ' ' + this.product?.fields?.['name'] + ' (' + this.product?.fields?.['acronym'] + ')';
  }

  getDalongReviewLink(dalonglink: any, acronym: any, index: number): string {
    if(this.indexAddZeroArray.includes(acronym)){
      if(index < 10){
        return this.dalongReviewUrl + dalonglink.replaceAll('$','0' + (index+1));;
      }
    }
    if(acronym == 'H2YM-60'){
      if(index == 1){
        index++;
      }
    }
    if(dalonglink.includes('seed/s') && index==12){
      return this.dalongReviewUrl + dalonglink.replaceAll('$',113);
    }
    if(dalonglink.includes('_')){
      return this.dalongReviewUrl + dalonglink.replaceAll('$',index+1);
    }
    else{
      return this.dalongReviewUrl + dalonglink.replaceAll('$',index+1);
    }
  }
  getDalongInfoLink(dalonglink: any, acronym: any, index: number): string {
    if(this.indexAddZeroArray.includes(acronym)){
      if(index < 10){
        return this.dalongReviewUrl + dalonglink.replaceAll('$','0' + (index+1));;
      }
    }
    if(acronym == 'H2YM-60'){
      if(index == 1){
        index++;
      }
    }
    if(dalonglink.includes('seed/s') && index==12){
      return this.dalongReviewUrl + dalonglink.replaceAll('$',113);
    }
    if(dalonglink.includes('_')){
      return this.dalongReviewUrl + dalonglink.replaceAll('$',index+1).replaceAll('_p.htm','_i.htm');
    }
    else{
      return this.dalongReviewUrl + dalonglink.replaceAll('$',index+1);
    }
  }
  getDalongPartLink(dalonglink: any, acronym: any, index: number): string {
    if(acronym == 'H2YM-60'){
      if(index == 1){
        index++;
      }
    }
    if(dalonglink.includes('_')){
      return this.dalongReviewUrl + dalonglink.replaceAll('$',index+1).replaceAll('_p.htm','_c.htm');
    }
    else{
      return this.dalongReviewUrl + dalonglink.replaceAll('$',index+1);
    }
  }
}
