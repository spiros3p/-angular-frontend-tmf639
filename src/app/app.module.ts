import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/router/app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { SingleResourcesComponent } from './components/single-resources/single-resources.component';
import { ResourceItemBlockComponent } from './components/resource-item-block/resource-item-block.component';
import { CreateResourceComponent } from './components/create-resource/create-resource.component';
import { ResourceItemListComponent } from './components/resource-item-list/resource-item-list.component';
import { ResourcesViewListComponent } from './components/resources-view-list/resources-view-list.component';
import { ResourcesViewBlockComponent } from './components/resources-view-block/resources-view-block.component';
import { ResourcesFilterComponent } from './components/resources-filter/resources-filter.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { ModalSingleResourcesActionComponent } from './components/modal-single-resources-action/modal-single-resources-action.component';
import { ModalDeleteResourceComponent } from './components/modal-delete-resource/modal-delete-resource.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ModalSingleResourcesValuesComponent } from './components/modal-single-resources-values/modal-single-resources-values.component';
import { ModalSingleResourcesParametersComponent } from './components/modal-single-resources-parameters/modal-single-resources-parameters.component';

import { HttpRequestInterceptor } from 'src/app/interceptors/HttpInterceptor';
import { AccountComponent } from './components/account/account.component';
import { UsersListComponent } from './components/users-list/users-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResourcesComponent,
    SingleResourcesComponent,
    ResourceItemBlockComponent,
    CreateResourceComponent,
    ResourceItemListComponent,
    ResourcesViewListComponent,
    ResourcesViewBlockComponent,
    ResourcesFilterComponent,
    MapPageComponent,
    ModalSingleResourcesActionComponent,
    ModalDeleteResourceComponent,
    LoginComponent,
    SignupComponent,
    PagenotfoundComponent,
    AccountComponent,
    UsersListComponent,
    ModalSingleResourcesValuesComponent,
    ModalSingleResourcesParametersComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalSingleResourcesActionComponent, ModalSingleResourcesParametersComponent, ModalSingleResourcesValuesComponent, ModalDeleteResourceComponent]
})
export class AppModule { }
