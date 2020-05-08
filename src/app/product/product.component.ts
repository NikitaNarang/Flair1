import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  updateProductName = false
  update: any ={}
  productData: any=[
    {name: "Pen", nummber: "2"},
    {name: "Pencil", number: "2"},
    {name: "Paper", number: "1"}
  ];
  getCurrentProduct(product): void{
    console.log(product);
  }

  updateProduct(data){
    this.updateProductName = true;
    this.update.name=this.productData;
    console.log(this.productData);
  }

  constructor() {}

  ngOnInit(): void {
  }

}
