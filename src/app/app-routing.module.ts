import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: '',
        component: LandingComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard] ,
    children: [
      { path: 'tasks', component: ListTaskComponent },
      { path: 'users', component: UserListComponent },

      { path: 'add-task', component: AddTaskComponent },
      { path: 'add-user', component: UserAddComponent },

      { path: 'edit-task/:id', component: TaskEditComponent },
      { path: 'edit-user/:id', component: UserAddComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
