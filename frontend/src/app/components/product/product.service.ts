import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  //Insere dados do produto no backend // Insert product data in the backend
 create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
 }

 //Lê os dados do backend // Reads backend data
 read(): Observable<Product[]> {
   return this.http.get<Product[]>(this.baseUrl).pipe(
    map((obj) => obj),
    catchError(e => this.errorHandler(e))
  )
 }

 //Lê os dados por meio do id do produto // Reads data via product id
 readById(id: number): Observable<Product> {
  const url = `${this.baseUrl}/${id}`
  return this.http.get<Product>(url).pipe(
    map((obj) => obj),
    catchError(e => this.errorHandler(e))
  )
 }

//Atualizar os dados do produto // Update product data
 update(product: Product): Observable<Product> {
  const url = `${this.baseUrl}/${product.id}`
  return this.http.put<Product>(url, product).pipe(
    map((obj) => obj),
    catchError(e => this.errorHandler(e))
  )
 }

 //Deleta os dados // Delete the data
 delete(id: number): Observable<Product> {
   const url = `${this.baseUrl}/${id}`
   return this.http.delete<Product>(url).pipe(
    map((obj) => obj),
    catchError(e => this.errorHandler(e))
  )
 }

 //Mostrar que aconteceu algum error no sistema // Show that an error has occurred in the system
 errorHandler(e: any): Observable<any> {
  this.showMessage('ERROR!', true)  
  return EMPTY
 }

}
