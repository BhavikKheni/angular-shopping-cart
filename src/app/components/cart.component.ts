import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model'
import { Item } from '../entity';
import { ProductService } from '../service/product.service';
// import { writeJsonFile } from 'write-json-file'
// const fs = require("fs");
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})

export class CartComponent implements OnInit {
  products: Product[];
  items: Item[] = [];
  total: number = 0;

  constructor(
    private productService: ProductService
  ) {
    this.productService.findAll().subscribe((data: any) => {
      this.products = data;
    })
  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart') || "");
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart') || "");
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  onOrder() {
    const records: any = []
    this.items.forEach((r: any) => {
      records.push({ id: r.product.id, availableProducts: r.product.availableProducts - r.quantity })
    })
    localStorage.removeItem("cart")
    //  writeJsonFile('assets/ineventory.json', JSON.stringify([records]))
  }

}