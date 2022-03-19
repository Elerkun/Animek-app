import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AnimePageComponent } from './components/anime-page/anime-page.component';
import { AnimesSearchComponent } from './components/animes-search/animes-search.component';
import { CategoriesSearchComponent } from './components/categories-search/categories-search.component';
import { ChatComponent } from './components/chat/chat.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { SearchComponent } from './components/search/search.component';
import { SigninComponent } from './components/signin/signin.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

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
