import { Injectable } from '@angular/core';
// import Contentful createClient and type for `Entry`
import { createClient, Entry } from 'contentful';
import { environment } from '../environments/environment';

// configure the service with tokens and content type ids
// SET YOU OWN CONFIG here
const CONFIG = {
  space: environment.CONTENTFUL_SPACE_ID,
  accessToken: environment.CONTENTFUL_ACCESS_TOKEN,
  preview: environment.CONTENTFUL_PREVIEW,
  contentTypeIds: {
    product: 'productLine',
    modelKit: 'modelKit',
  },
};

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
    host: CONFIG.preview ? "preview.contentful.com" : "cdn.contentful.com"
  });

  constructor() { }

  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.product
    }, query))
    .then(res => res.items);
  }

  getModelKits(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.modelKit
    }, query))
    .then(res => res.items);
  }
}
