import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//Components
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';

//Services
import { EmployeeService } from './services/employee.service';
import { AuthService } from './services/auth.service';

//Effects
import { EmployeeListEffects } from './effects/employee.list.effects';
import { EmployeeEffects } from './effects/employee.effects';

//Others
import reducers from './app.reducers';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    StoreModule.provideStore(reducers),
    EffectsModule.run(EmployeeListEffects),
    EffectsModule.run(EmployeeEffects)
  ],
  providers: [
    EmployeeService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
