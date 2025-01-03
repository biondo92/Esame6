import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { CategoriesService } from './services/categories.service';
import { Category } from './models/Category';
import { filter } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { BreadcrumbItem } from './components/breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-streaming'; // title dell applicazione 
  public breadcrumbItems: BreadcrumbItem[] = []  //contiene gli elementi che comporranno il breadCrumb mostrato poi  frontEnd

  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated()
  };
  public isInRole(role: string): boolean {
    return this.auth.isInRole(role)
  };
  
  //dato che la visualizzazione per admin è diversa da quella dell utente questa funzione determina le classi Css da applicare in base al ruole dell utente loggato 
  public getWrapperStyle() {
    var result = ""
    if (!this.isInRole('Admin')) {
      result = 'd-flex flex-column'
    }
    return result
  }

  isAdmin: boolean = true
  public isRenderingLoginPage: boolean = false
  public isRenderingRegisterPage: boolean = false
  /**
   *
   */
  constructor(
    private titleService: Title,
    private router: Router,
    private auth: AuthService,
    private categories: CategoriesService
  ) { }

  
  async ngOnInit(): Promise<void> {
   
 
    //questo codice analizza il router e in base all URL vcostruisce il breadCrumb
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {

        let breadcrumbs: BreadcrumbItem[] = []
        let path = this.router.url
          .split("/")

        this.breadcrumbItems.push(new BreadcrumbItem("/", "Home"))
        path.forEach(p => {
          this.breadcrumbItems.push(new BreadcrumbItem(p, p[0]?.toUpperCase() + p.substr(1).toLowerCase()))
        })

        let raw = path.at(-1) || "Home";

        this.title = raw[0]?.toUpperCase() + raw.substr(1).toLowerCase();

        if (this.router.url === '/login') {
          this.isRenderingLoginPage = true
        }
        else {
          this.isRenderingLoginPage = false
        }
        if (this.router.url === '/register') {
          this.isRenderingRegisterPage = true
        }
        else {
          this.isRenderingRegisterPage = false
        }
      });
  }
}
