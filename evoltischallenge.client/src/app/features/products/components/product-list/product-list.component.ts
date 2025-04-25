import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import * as ProductActions from '../../store/actions/product.actions';
import * as ProductSelectors from '../../store/selectors/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  selectedProduct: Product | null = null;
  
  displayDialog = false;
  
  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  openNew(): void {
    this.selectedProduct = null;
    this.displayDialog = true;
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product };
    this.displayDialog = true;
  }

  deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: `¿Está seguro que desea eliminar el producto "${product.name}"?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(ProductActions.deleteProduct({ id: product.id! }));
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto eliminado',
          life: 3000
        });
      }
    });
  }

  saveProduct(product: Product): void {
    if (product.id) {
      this.store.dispatch(ProductActions.updateProduct({ product }));
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto actualizado',
        life: 3000
      });
    } else {
      this.store.dispatch(ProductActions.createProduct({ product }));
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto creado',
        life: 3000
      });
    }
    
    this.displayDialog = false;
  }

  hideDialog(): void {
    this.displayDialog = false;
  }
}