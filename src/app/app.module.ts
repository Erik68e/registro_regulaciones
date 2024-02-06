import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegulacionesComponent } from './components/regulaciones/regulaciones.component';
import { FinalComponent } from './components/final/final.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InformacionService } from './services/informacion.service';
import { UserService } from './services/user.service';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
 
const rutas: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'regulaciones', component: RegulacionesComponent },
  { path: 'solicitud', component: SolicitudComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    RegulacionesComponent,
    FinalComponent,
    LogoutComponent,
    SolicitudComponent,
    ConfiguracionComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rutas),
    HttpClientModule
  ],
  providers: [
    InformacionService,
    UserService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
