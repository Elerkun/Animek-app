import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { AnimePageComponent } from './anime-page/anime-page.component';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AnimesSearchComponent } from './animes-search/animes-search.component';
import { UsuarioComponent } from './usuario/usuario.component';
import{FormsModule} from '@angular/forms';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { CategoriesSearchComponent } from './categories-search/categories-search.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path:'index', component:IndexComponent},
  {path:'login', component:LoginComponent},
  {path:'signin', component:SigninComponent},
  {path:'animemanga-page/:type/:id/:userId', component:AnimePageComponent},
  {path:'search/:userId', component:SearchComponent},
  {path:'myProfile/:userId', component:MyProfileComponent},
  {path:'animesmangasSearch', component:AnimesSearchComponent},
  {path:'uploadImage/:id', component:UploadImagesComponent},
  {path: 'categoriesSearch/:categories/:userId', component:CategoriesSearchComponent},
  {path: 'chat', component:ChatComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent,
    LoginComponent,
    HeaderComponent,
    SigninComponent,
    AnimePageComponent,
    SearchComponent,
    MyProfileComponent,
    AnimesSearchComponent,
    UsuarioComponent,
    UploadImagesComponent,
    CategoriesSearchComponent,
    ChatComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
