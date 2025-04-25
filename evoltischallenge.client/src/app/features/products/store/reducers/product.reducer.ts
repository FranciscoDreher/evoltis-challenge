import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../models/product.model';
import * as ProductActions from '../actions/product.actions';

export interface ProductState extends EntityState<Product> {
  selectedProductId: number | null;
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  selectedProductId: null,
  loading: false,
  error: null
});

export const productReducer = createReducer(
  initialState,
  
  // Load Products
  on(ProductActions.loadProducts, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => 
    adapter.setAll(products, { ...state, loading: false })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Load Single Product
  on(ProductActions.loadProduct, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductSuccess, (state, { product }) => 
    adapter.upsertOne(product, { 
      ...state, 
      loading: false,
      selectedProductId: product.id || null
    })
  ),
  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Product
  on(ProductActions.createProduct, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.createProductSuccess, (state, { product }) =>
    adapter.addOne(product, { 
      ...state, 
      loading: false 
    })
  ),
  on(ProductActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Product
  on(ProductActions.updateProduct, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) =>
    adapter.updateOne(
      { id: product.id!, changes: product },
      { ...state, loading: false }
    )
  ),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Product
  on(ProductActions.deleteProduct, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.deleteProductSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Set Selected Product
  on(ProductActions.setSelectedProduct, (state, { product }) => ({
    ...state,
    selectedProductId: product ? product.id! : null
  }))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();