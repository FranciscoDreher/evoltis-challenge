import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { Category } from '../../../../shared/enums/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: false
})
export class ProductFormComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();
  
  productForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.productForm = this.createForm();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      this.productForm.patchValue(changes['product'].currentValue);
    } else if (changes['product'] && !changes['product'].currentValue) {
      this.productForm.reset({
        name: '',
        description: '',
        price: null,
        stock: 0,
        isActive: true,
        category: Category.Others
      });
    }
  }
  
  private createForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      price: [null, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      isActive: [true],
      category: [Category.Others]
    });
  }
  
  saveProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    
    this.save.emit(this.productForm.value);
  }
  
  cancelForm(): void {
    this.cancel.emit();
  }
  
  get nameInvalid(): boolean {
    return this.productForm.get('name')!.invalid && this.productForm.get('name')!.touched;
  }
  
  get priceInvalid(): boolean {
    return this.productForm.get('price')!.invalid && this.productForm.get('price')!.touched;
  }
}