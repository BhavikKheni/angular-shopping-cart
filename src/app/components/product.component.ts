import { Component, OnInit } from '@angular/core';

import { Item } from '../entity';
import { Product } from '../model';
import { ProductService } from '../service/product.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;

  products: Product[];
  compareProducts: Array<any> = []
  isTableView: boolean = true
  dictionary2: any = {}
  objectKeys = Object.keys;

  checkedNumber: number = 0
  isCompare: boolean = false
  form: FormGroup;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      array: this.formBuilder.array([])
    });
    this.productService.findAll().subscribe((data: any) => {
      this.productService.findInventory().subscribe((res: any) => {
        var d: any = []
        data.forEach((element: any) => {
          res.forEach((r: any) => {
            if (element.id == r.id) {
              d.push({
                ...element,
                availableProducts: r.availableProducts,
                limitItem: r.limitItem
              })
            }
          });
        });
        this.products = d
        this.renderForm(this.products)
      })
    })

  }

  getControlsForOption() {
    return this.form.get("array") as FormArray
  }

  renderForm(records: any) {
    records &&
      records.forEach((record: any) => {
        this.addRecord(record)
      });
  }

  onCheck(event: any, control: any) {
    if (control.value.isChecked) {
      this.checkedNumber++;
    } else {
      this.checkedNumber--;
    }
  }

  numbers(number: number) {
    return Array.from({ length: number }, (_, idx) => ++idx)
  }

  addRecord(record: any) {
    this.getControlsForOption().push(this.newRecord(record));
  }

  newRecord(record: any): FormGroup {
    return this.formBuilder.group({
      availableProducts: record.availableProducts,
      id: record.id,
      limitItem: record.limitItem,
      name: record.name,
      photo: record.photo,
      price: record.price,
      sim: record.sim,
      network: record.network,
      charging: record.charging,
      fingerprint: record.fingerprint,
      date: record.date,
      isChecked: false
    })
  }

  onCompareProduct() {
    const value = this.form.value
    this.compareProducts = value.array.filter((v: any) => v.isChecked)
  }

  addToCart(quantity: number, id: string) {
    if (quantity) {


      var item: Item = {
        product: this.find(id),
        quantity: Number(quantity)
      };

      if (localStorage.getItem('cart') == null) {
        let cart: any = [];
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart: any = JSON.parse(localStorage.getItem('cart') || "");
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
          let item: Item = JSON.parse(cart[i]);
          if (item.product.id == id) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let item: Item = JSON.parse(cart[index]);
          item.quantity = Number(quantity)
          cart[index] = JSON.stringify(item);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
      this.loadCart();
    }
    else {
      alert("Please select quantity")
    }
  }
  find(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
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
  onTableView(type: string) {
    if (type == 'table') {
      this.isTableView = true
    } else {
      this.isTableView = false
    }
  }

}