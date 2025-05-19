import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  loading = false;
  feedbackMessage = '';
  isSuccess = false;
  searchTerm: string = '';
  page: number = 1;
  totalPages: number = 1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts(this.searchTerm, this.page).subscribe({
      next: (response) => {
        this.products = response.products;
        const totalCount = response.totalCount || 0;

        this.totalPages = Math.ceil(totalCount / 6);
        this.loading = false;
      },
      error: () => {
        console.error('Error loading products');
        this.loading = false;
      }
    });
  }


  onSearch(): void {
    this.page = 1; 
    this.loadProducts();
  }

  getImageUrl(imagePath: string): string {
    return `http://localhost:5272${imagePath}`;
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.loading = true;
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: () => {
          console.error('Error deleting product');
          this.loading = false;
        }
      });
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }
}
