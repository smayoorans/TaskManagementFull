import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTaskPipe } from './filter-task.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from './components/login/login.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ListTaskComponent,
    FilterTaskPipe,
    TaskEditComponent,
    UserListComponent,
    UserAddComponent,
    LoginComponent,
    BlankLayoutComponent,
    AdminLayoutComponent,
    RegisterComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    BsDatepickerModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
