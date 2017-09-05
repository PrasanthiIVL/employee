import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
//import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';

import { EmployeeService } from './services/employee.service';
import { empCountReducer } from './reducers/emp.count.reducer';
import { EmployeeEffects } from './effects/employee.effects';
import { employeeReducer } from './reducers/employee.reducer';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'employee',
          component: EmployeeComponent
        }
      ]),
    StoreModule.provideStore({
        empCount: empCountReducer,
        employee$: employeeReducer
      }),
    /*StoreDevtoolsModule.instrument({
      maxAge: 10
    }),*/
    EffectsModule.run(EmployeeEffects)
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
