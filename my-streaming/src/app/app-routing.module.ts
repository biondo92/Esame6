import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RolesComponent } from './components/roles/roles.component';
import { CitiesComponent } from './components/cities/cities.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { FilmsComponent } from './components/films/films.component';
import { SeriesComponent } from './components/series/series.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogComponent } from './components/catalog/catalog.component';

const routes: Routes = [
  {
    path: '',
    title: "Home",
    component: HomeComponent
  },
  {
    path: 'login',
    title: "Login",
    component: LoginComponent,
  },
  {
    path: 'register',
    title: "Register",
    component: RegisterComponent,
  },
  {
    path: 'catalog',  //il path segment dove risiede la pagina
    title: "Catalog",
    component: CatalogComponent,
    canActivate: [AuthGuard] //blocca l accesso a un utente non loggato
  },
  {
    path: 'profile',
    title: "Profilo",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    title: "Categorie",
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    title: "Ruoli",
    component: RolesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cities',
    title: "Città",
    component: CitiesComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'settings',
    title: "Impostazioni",
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'series',
    title: "Serie Tv",
    component: SeriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'films',
    title: "Film",
    component: FilmsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    title: "Utenti",
    component: UsersComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
