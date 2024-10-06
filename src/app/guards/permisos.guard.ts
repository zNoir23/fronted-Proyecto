import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermisosGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si hay un token en el localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Si hay un token, permite el acceso
      return true;
    } else {
      // Si no hay un token, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
