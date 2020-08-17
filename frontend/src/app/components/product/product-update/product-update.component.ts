import { Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product

  constructor(private productService: ProductService, private router: Router, private atRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.atRoute.snapshot.paramMap.get('id') //Converter para númerico coloque + // Convert to numeric place +
    this.productService.readById(id).subscribe(product => {
      this.product = product
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(()  => {
      this.productService.showMessage('Product updated successfully :)')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
