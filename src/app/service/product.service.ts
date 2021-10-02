import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  findAll() {
    return this.httpClient.get("assets/data.json")
  }

  findInventory() {
    return this.httpClient.get("assets/ineventory.json")
  }


}