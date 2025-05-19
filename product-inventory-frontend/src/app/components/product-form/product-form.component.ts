import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  selectedFile: File | null = null;
  loading = false;
  feedbackMessage = '';
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantityInStock: ['', [Validators.required, Validators.min(1)]],
      category: ['']  // Category is a free text input
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = Number(id);
        this.loadProductData(this.productId);
      }
    });
  }

  private loadProductData(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            quantityInStock: product.quantityInStock,
            category: product.category
          });
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product data:', error);
        this.feedbackMessage = 'Error loading product data.';
        this.isSuccess = false;
        this.loading = false;
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value;

    if (this.isEditMode) {
      this.updateProduct(productData);
    } else {
      this.addProduct(productData);
    }
  }

  private addProduct(productData: any): void {
    this.loading = true;
    this.productService.addProduct(productData, this.selectedFile ?? undefined).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.feedbackMessage = 'Error adding product.';
        this.isSuccess = false;
        this.loading = false;
      }
    });
  }

  private updateProduct(productData: any): void {
    if (!this.productId) return;

    const updatedProduct = {
      ...productData,
      id: this.productId
    };

    this.loading = true;
    this.productService.updateProduct(this.productId, updatedProduct, this.selectedFile ?? undefined).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.feedbackMessage = 'Error updating product.';
        this.isSuccess = false;
        this.loading = false;
      }
    });
  }

}
