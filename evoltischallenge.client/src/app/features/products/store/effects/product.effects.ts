import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../../../../core/services/product.service';
import * as ProductActions from '../actions/product.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {
    console.log("actions", actions$)
  }

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    mergeMap(() => this.productService.getProducts().pipe(
      map(products => ProductActions.loadProductsSuccess({ products })),
      catchError(error => of(ProductActions.loadProductsFailure({ error })))
    ))
  ));

  loadProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProduct),
    mergeMap(({ id }) => this.productService.getProductById(id).pipe(
      map(product => ProductActions.loadProductSuccess({ product })),
      catchError(error => of(ProductActions.loadProductFailure({ error })))
    ))
  ));

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.createProduct),
    concatMap(({ product }) => this.productService.createProduct(product).pipe(
      map(newProduct => ProductActions.createProductSuccess({ product: newProduct })),
      catchError(error => of(ProductActions.createProductFailure({ error })))
    ))
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateProduct),
    concatMap(({ product }) => this.productService.updateProduct(product).pipe(
      map(() => ProductActions.updateProductSuccess({ product })),
      catchError(error => of(ProductActions.updateProductFailure({ error })))
    ))
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.deleteProduct),
    mergeMap(({ id }) => this.productService.deleteProduct(id).pipe(
      map(() => ProductActions.deleteProductSuccess({ id })),
      catchError(error => of(ProductActions.deleteProductFailure({ error })))
    ))
  ));
}