import { Component, ElementRef,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule,FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { IonicModule,AnimationController,Animation } from '@ionic/angular';
import { NavigationExtras, Router,RouterModule } from '@angular/router';

import { UserService } from 'src/app/user.service'; // Ajusta la ruta según la ubicación real del archivo


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule ]
})
export class LoginPage  {

  loginForm! : FormGroup;

  @ViewChild('logo',{read:ElementRef }) logo?:ElementRef<HTMLImageElement>;
  @ViewChild('text',{read:ElementRef }) text?:ElementRef<HTMLImageElement>;

  private logoAnimation!:Animation
  private textAnimation!:Animation

  constructor(private fb:FormBuilder, 
              private router:Router,  
              private animationCtrl:AnimationController,
              private  retornoService:  UserService
            ) {

  this.loginForm=this.fb.group({ 

    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
        Validators.pattern('^[a-zA-Z0-9]*$')
      ]
    ],

    password:[
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
      ]
    ]
});
  } // fin constructor

  onLogin() {
  if (this.loginForm.valid) {
    const username = this.loginForm.get('username')?.value;
    const password = Number(this.loginForm.get('password')?.value); // Convertir a número si es necesario

    console.log(`Username: ${username}, Password: ${password}`);

    const userType = this.retornoService.validaServicio(username, password);
    console.log(`User type returned: ${userType}`);

    if (userType) {
      let navigationExtras: NavigationExtras = {
        state: {
          nombre: username,
          tipo: userType
        }
      };

      if (userType === 'admin') {
        this.router.navigate(['menu'], navigationExtras);
      } else if (userType === 'pasajero') {
        this.router.navigate(['pasajero'], navigationExtras); // Asegúrate de tener esta ruta configurada
      }
    } else {
      alert('Usuario o Password incorrecta');
    }
  } else {
    console.error('Formulario no válido');
  }
}

  


  ngAfterViewInit() { 
    if (this.logo?.nativeElement && this.text?.nativeElement){ 
      this.logoAnimation=this.animationCtrl.create()
      .addElement(this.logo.nativeElement)
      .duration(5000)
      .fromTo('opacity','0','1');

      this.textAnimation=this.animationCtrl.create()
      .addElement(this.text.nativeElement)
      .duration(1000)
      .fromTo('transform','translateY(20px)','translateY(0)');




      this.logoAnimation.play();
      this.textAnimation.play();

    }// Fin If
      else{ 
        console.error('Los elementos logo o texto no fueron encontrados')
      }


  } // Fin ngAfterViewInit

  goToRegister() {
    this.router.navigate(['registro']); // Asegúrate de crear y configurar esta ruta para la página de registro.
  }
  

} // Fin 

