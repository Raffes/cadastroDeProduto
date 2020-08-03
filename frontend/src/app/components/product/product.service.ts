import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  //Insere dados do produto no backend // Insert product data in the backend
 create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
 }

 //Lê os dados do backend // Reads backend data
 read(): Observable<Product[]> {
   return this.http.get<Product[]>(this.baseUrl)
 }

 //Lê os dados por meio do id do produto // Reads data via product id
 readById(id: String): Observable<Product> {
  const url = `${this.baseUrl}/${id}`
  return this.http.get<Product>(url)
 }

//Atualizar os dados do produto // Update product data
 update(product: Product): Observable<Product> {
  const url = `${this.baseUrl}/${product.id}`
  return this.http.put<Product>(url, product)
 }

}
