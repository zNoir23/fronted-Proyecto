import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    email: ['rodriguez@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]],
    remember: [false]
  },);

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
  }

  login() {
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp =>{
      console.log(resp)

      // Dashboard
      this.router.navigateByUrl('/')

    }, (err) => {
      // Si sucede un error
      Swal.fire('Error', err.error.msg, 'error')
    } );
   
  }

}