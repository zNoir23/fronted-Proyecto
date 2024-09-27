import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto-form.interface'; 


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = { nombre: '', descripcion: '', categoria: '', precio: 0, stock: 0 };
  editMode = false;
  editIndex: number | null = null;
  mensaje: string | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos(); // Cargar productos al iniciar el componente
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  onSubmit() {
    if (this.producto.precio <= 1000 || isNaN(this.producto.precio)) {
      alert("El precio debe ser un número mayor a 1,000 pesos.");
      return;
    }

    if (this.editMode) {
      const id = this.productos[this.editIndex!]._id; // Asegúrate de que `_id` tenga un valor
      if (id) { // Verifica que `id` no sea undefined
        this.productoService.actualizarProducto(id, this.producto).subscribe(
          (updatedProducto) => {
            this.productos[this.editIndex!] = updatedProducto;
            this.mensaje = "Producto Actualizado";
            this.resetForm();
          },
          error => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      }
    } else {
      this.productoService.crearProducto(this.producto).subscribe(
        (newProducto) => {
          this.productos.push(newProducto);
          this.mensaje = "Producto Agregado";
          this.resetForm();
        },
        error => {
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }

  resetForm() {
    this.producto = { nombre: '', descripcion: '', categoria: '', precio: 0, stock: 0 };
    this.editMode = false;
    this.editIndex = null;
  }

  editProducto(producto: Producto) {
    this.producto = { ...producto }; // Copiar el producto seleccionado para editar
    this.editMode = true; // Activar el modo de edición
    this.editIndex = this.productos.indexOf(producto); // Guardar el índice del producto que se está editando
  }

  eliminarProducto(producto: Producto) {
    const id = producto._id; // Asegúrate de que `_id` tenga un valor
    if (id) { // Verifica que `id` no sea undefined
      this.productos.splice(this.productos.indexOf(producto), 1);
      this.mensaje = "Producto Eliminado"
      this.productoService.eliminarProducto(id).subscribe(
        () => {
          console.log('Producto eliminado');
        },
        error => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }
}
