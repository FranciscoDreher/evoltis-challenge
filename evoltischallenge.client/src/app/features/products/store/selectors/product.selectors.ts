import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from '../reducers/product.reducer';

export const selectProductState = createFeatureSelector<fromProduct.ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  fromProduct.selectAll
);

export const selectProductEntities = createSelector(
  selectProductState,
  fromProduct.selectEntities
);

export const selectSelectedProductId = createSelector(
  selectProductState,
  state => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
  selectProductEntities,
  selectSelectedProductId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const selectProductsLoading = createSelector(
  selectProductState,
  state => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  state => state.error
);