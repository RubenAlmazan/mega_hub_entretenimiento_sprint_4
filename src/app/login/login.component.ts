import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDataService } from '../api-data.service';
import { StorageService } from '../servicios/info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    if (!form.name || !form.password) {
      alert('Por favor, ingrese un nombre de usuario y contraseña.');
      return;
    }

    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(form.name)) {
      alert('Verifique que su usuario esté correctamente escrito. Intentelo de nuevo');
      return;
    }

    const encontrado = this.data.some(item =>
      form.name === item.username && form.password === item.password
    );

    if (encontrado) {
      const user = this.data.find(item =>
        form.name === item.username && form.password === item.password
      );

      if (user) {
        const data = { id: user.id };
        this.storageService.setItem('dataKey', data);

        this.router.navigate(['/main']); // Navegar al segundo componente

      }
    } else {
      alert('Usuario y/o contraseña incorrectos. Inténtelo de nuevo');
    }
  }
}
