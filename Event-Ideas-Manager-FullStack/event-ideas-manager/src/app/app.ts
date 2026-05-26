import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IdeasManagerComponent } from './components/ideas-manager/ideas-manager';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IdeasManagerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'event-ideas-manager';
}