import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: "app-compare-product",
  templateUrl: "./compare.component.html",
  styleUrls: ["./compare.component.css"],
})

export class CompareProductComponent implements OnInit {
  @Input() compareProducts: any
  ngOnInit(): void {
  }
}