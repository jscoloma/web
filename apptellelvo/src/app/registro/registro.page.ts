import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule aquí

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule] // Agrega ReactiveFormsModule aquí
})
export class RegistroPage {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]], // Maximo de 4 caracteres
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password, userType } = this.registerForm.value;
      console.log('Registro exitoso:', username, email, password, userType);
      
      // Aquí puedes agregar lógica para guardar el usuario, si es necesario
      // Por ejemplo, llamar a un servicio que maneje la creación de usuarios.
  
      alert('Registro exitoso!'); // Muestra una alerta de registro exitoso
      this.router.navigate(['login']); // Redirige al login
    } else {
      console.log('Formulario inválido');
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  
}
