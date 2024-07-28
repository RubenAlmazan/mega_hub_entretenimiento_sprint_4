import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../api-data.service';
import { StorageService } from '../servicios/info.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  data: any[] = []; // Especifica que es un array de cualquier tipo

  constructor(
    private dataService: ApiDataService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
      }
    });
  }

  onSubmit(form: any): void {
    //console.log(form.name, form.password, form.correo);

    if (!form.name || !form.password || !form.correo) {
      alert('Por favor, ingrese un correo, nombre de usuario y/o contraseña para su registro');
      return;
    }
    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(form.name)) {
      alert('Verifique que su usuario esté correctamente escrito. Intentelo de nuevo');
      return;
    }

    const encontrado = this.data.some(item =>
      form.name === item.username || form.correo === item.correo
    );

    if (encontrado === true) {
      alert('Ese usuario y/o correo ya han sido registrados. Intentelo de nuevo. ');
      return;
    }

    alert('Espere un momento. Se esta creando su cuenta en esta plataforma');

    of(encontrado === false).pipe(
      delay(3000), // Retrasa la emisión del valor en 3 segundos
      tap(() => {
        this.registrarUsuario(form.name, form.correo, form.password); // Cambié username por correo
      })
    ).subscribe();

    // Implementar lógica para borrar el favorito aquí
  }

  registrarUsuario(name: string, correo: string, password: string): void {
    console.log(name, correo, password);
    
    this.dataService.insertRegistro(name, correo, password).subscribe({
      next: (response) => {
          //console.log('Registro insertado correctamente:', response);
          alert('Su cuenta ha sido creada exitosamente. Inicie sesion para acceder al sistema');
          this.router.navigate(['/inicio']); // Navegar al segundo componente
      },
      error: (err) => {
          console.error('Error al insertar registro:', err);
          // Manejar errores de forma específica aquí si es necesario
      }
  });
  
    
  }
}
