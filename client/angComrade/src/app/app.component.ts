import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { log } from 'node:console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  login: string = 'user1';
  pas: string = 'password1';

  async getAuth(): Promise<void>{
    const response = await fetch("https://localhost:6738/auth",{
      method: 'POST',
      headers: {'Authorization': 'Bearer 1a2b-3c4d-5e6f-7g8h'},
      body: JSON.stringify({login: this.login, password: this.pas}),
    });
}
}
