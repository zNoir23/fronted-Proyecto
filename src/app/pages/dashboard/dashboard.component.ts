import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto-form.interface'; 
import Swal from 'sweetalert2';  // Asegúrate de importar SweetAlert

@Component({
  selector: 'app-dashboard',  
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productos: Producto[] = [];
  productosOriginales: Producto[] = []; // Almacena la lista original de productos
  producto: Producto = { nombre: '', descripcion: '', categoria: '', precio: 0, stock: 0 };
  editMode = false;
  editIndex: number | undefined;
  mensaje: string | null = null;

  // Agregamos la variable para filtrar por categoría
  categorias: string[] = ['Aseo', 'Alimento', 'Mecatos', 'Bebidas']; // Ejemplo de categorías
  selectedCategory: string = ''; // Almacena la categoría seleccionada

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.productosOriginales = [...data]; // Almacenar copia
      },
      error => {
        Swal.fire('Error', 'Error al obtener productos', 'error');
        console.error('Error al obtener productos:', error);
      }
    );
  }

  onSubmit() {
    if (this.producto.precio < 200 || isNaN(this.producto.precio)) {
      Swal.fire('Advertencia', "El precio debe ser un número mayor o igual a 200 pesos.", 'warning');
      return;
    }

    if (this.producto.stock < 0) {
      Swal.fire('Advertencia', "El stock no puede ser un número negativo.", 'warning');
      return;
    }

    if (this.editMode) {
      const id = this.productos[this.editIndex!]._id;
      if (id) {
        this.productoService.actualizarProducto(id, this.producto).subscribe(
          (updatedProducto) => {
            this.productos[this.editIndex!] = updatedProducto;
            Swal.fire('Éxito', "Producto Actualizado", 'success');
            this.resetForm();
          },
          error => {
            Swal.fire('Error', 'Error al actualizar el producto', 'error');
            console.error('Error al actualizar el producto:', error);
          }
        );
      }
    } else {
      this.productoService.crearProducto(this.producto).subscribe(
        (newProducto) => {
          this.productos.push(newProducto);
          Swal.fire('Éxito', "Producto Agregado", 'success');
          this.resetForm();
        },
        error => {
          Swal.fire('Error', 'Error al crear el producto', 'error');
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }

  resetForm() {
    this.producto = { nombre: '', descripcion: '', categoria: '', precio: 0, stock: 0 };
    this.editMode = false;
    this.editIndex = undefined;
  }

  editProducto(producto: Producto) {
    this.producto = { ...producto };
    this.editMode = true;  
    this.editIndex = this.productos.indexOf(producto);  
  }

  eliminarProducto(producto: Producto) {
    const id = producto._id;
    if (id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productos.splice(this.productos.indexOf(producto), 1);
          this.productoService.eliminarProducto(id).subscribe(
            () => {
              Swal.fire('Eliminado!', 'Producto Eliminado', 'success');
              console.log('Producto eliminado');
            },
            error => {
              Swal.fire('Error', 'Error al eliminar el producto', 'error');
              console.error('Error al eliminar el producto:', error);
            }
          );
        }
      });
    }
  }

  validarStock() {
    if (this.producto.stock < 0) {
      this.producto.stock = 0; 
    }
  }

  // Función para filtrar productos por categoría
  filtrarPorCategoria() {
    if (this.selectedCategory) {
      // Filtra desde la lista original
      this.productos = this.productosOriginales.filter(producto => producto.categoria === this.selectedCategory);
    } else {
      // Si no hay categoría seleccionada, muestra todos los productos
      this.productos = [...this.productosOriginales];
    }
  }
}
