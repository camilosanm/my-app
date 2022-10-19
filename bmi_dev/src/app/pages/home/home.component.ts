import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    console.log('1');
    this.goRegistration();
  }
  

  async goRegistration($regis: string = ''): Promise<void> {
    console.log('entró');
    const nav: string[] = ['/registration'];
    if ($regis.length) {
      nav.push($regis);
    }
    this.router.navigate(nav);
  }

}
