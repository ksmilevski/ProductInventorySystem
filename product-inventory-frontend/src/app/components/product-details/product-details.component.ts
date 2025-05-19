import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      console.log(`Fetching product with ID: ${productId}`);
      this.productService.getProductById(Number(productId)).subscribe(
        (product) => {
          console.log("Fetched Product:", product);
          this.product = product;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Product not found.';
          this.loading = false;
          console.error('Error fetching product:', error);
        }
      );
    } else {
      this.errorMessage = 'Invalid product ID.';
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
