import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrige "styleUrl" a "styleUrls"
})
export class HeaderComponent {
  
  constructor(private router: Router) {} // Inyecta Router

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token'); // Elimina el token
    this.router.navigate(['/login']); // Redirige al login
  }
}
