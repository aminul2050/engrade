import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string;
  public authLoggedIn = false;

  ngOnInit(): void {
    this.title = 'Engrade';
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    if ( auth ) {
        this.authLoggedIn = true;
    }
  }
}
