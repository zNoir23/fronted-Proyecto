import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; 
import { Producto } from '../interfaces/producto-form.interface'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private base_url = `${environment.bas_url}/productos`; 

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.base_url); 
  }

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.base_url, producto); 
  }

  // Actualizar un producto
  actualizarProducto(id: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.base_url}/${id}`, producto); 
  }

  // Eliminar un producto
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.base_url}/${id}`); 
  }
}
