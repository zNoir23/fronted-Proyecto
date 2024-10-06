import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs';

const base_url = environment.bas_url; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`, formData)

  }

  login (formData: LoginForm) {
   
    return this.http.post(`http://localhost:3006/api/login`, formData)
                    .pipe(
                      tap((resp: any) => {
                        console.log(resp)
                        localStorage.setItem('token', resp.token)
                      })
                    )

  }

    // Método para verificar si el usuario está autenticado
    isAuthenticated(): boolean {
      return !!localStorage.getItem('token'); // Retorna true si el token existe
    }
  
    // Método para cerrar sesión (opcional)
    logout() {
      localStorage.removeItem('token');
    }

}
