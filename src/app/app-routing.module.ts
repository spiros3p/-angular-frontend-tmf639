import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AuthGuardService as AdminGuard } from './services/admin-guard.service';

import { MapPageComponent } from './components/map-page/map-page.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { AccountComponent } from './components/account/account.component';
import { SingleResourcesComponent } from './components/single-resources/single-resources.component';
import { CreateResourceComponent } from './components/create-resource/create-resource.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

// AUTH Routes
// canActivate: [AdminGuard]
// canActivate: [AuthGuard]
const appRoutes: Routes = [
  { path: '', component: ResourcesComponent, canActivate: [AuthGuard] },
  { path: 'map', component: MapPageComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'resource/:id', component: SingleResourcesComponent, canActivate: [AuthGuard] },
  { path: 'createResource', component: CreateResourceComponent, canActivate: [AdminGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent, canActivate: [AuthGuard] },
]

// No AUTH Routes
// const appRoutes: Routes = [
//     { path: '', component: ResourcesComponent },
//     { path: 'map', component: MapPageComponent },
//     { path: 'account', component: AccountComponent },
//     { path: 'resource/:id', component: SingleResourcesComponent },
//     { path: 'createResource', component: CreateResourceComponent },
//     { path: 'signup', component: SignupComponent },
//     { path: 'login', component: LoginComponent },
//     { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
//   ]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }