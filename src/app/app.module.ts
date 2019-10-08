import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http' ;
import { AppComponent } from './app.component';
/*========================--Services--================================================*/
/*======--- MyServices ----=====*/
import { AuthService } from './services/Auth/auth.service';
import { GvarsService } from './services/G_vars/gvars.service';
import { APIService } from './services/API/api.service';
import { StrLimitPipe } from './services/str-limit/str-limit.pipe';
/*======-----------------=====*/
import {RouterModule,Routes} from '@angular/router';
import {Ng2PaginationModule} from 'ng2-pagination';
import { JwtModule } from '@auth0/angular-jwt';
// import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { OwlModule } from 'ngx-owl-carousel';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { Angular2SocialLoginModule } from "angular2-social-login";
import { ShareButtonModule } from '@ngx-share/button';
/*-=============================--Guards--===========================*/
import { AuthGuard } from './guards/Auth/auth.guard';
import { AdminGuard } from './guards/roles/admin.guard';
/*==================Components=========================*/
      /*---------pages-------*/
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
       /*-------Components-------*/
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ImgComponent } from './components/img/img.component';
import { SearchComponent } from './components/search/search.component';
import { PostAdComponent } from './pages/ads-list/post-ad/post-ad.component';
import { AdsListComponent } from './pages/ads-list/ads-list.component';
import { AdDetailsComponent } from './pages/ads-list/ad-details/ad-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdsSearchComponent } from './components/ads-search/ads-search.component';
import { AboutComponent } from './pages/about/about.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyAdsComponent } from './pages/my-account/my-ads/my-ads.component';
import { ProfileComponent } from './pages/my-account/profile/profile.component';
import { FavAdsComponent } from './pages/my-account/fav-ads/fav-ads.component';
import { ActivePhoneComponent } from './pages/login/active-phone/active-phone.component';
import { ForgetPasswordComponent } from './pages/login/forget-password/forget-password.component';
import { ProductComponent } from './components/product/product.component';
/*-=============================--Routes--===========================*/
const appRoutes : Routes = [
  {path:'',component:LayoutComponent,canActivate:[/*AuthGuard,AdminGuard*/],children: [
     {path:'',component:HomeComponent},
     {path:'PostAd',component:PostAdComponent},
     {path:'Ads',component:AdsListComponent},
     {path:'Ad/:id',component:AdDetailsComponent},
     {path:'About',component:AboutComponent},
     {path:'HowItWorks',component:HowItWorksComponent},
     {path:'Contact',component:ContactComponent},
     {path:'Profile',component:MyAccountComponent,canActivate:[AuthGuard]},
     //{path:'admin',component:APIComponent,canActivate:[AdminGuard]},
      ]},
  // {path:'login',component:LoginComponent,canActivate:[AuthGuard]},
  //{path:'signup',component:SignupComponent/*,canActivate:[LoggedInGuard]*/},
  { path: '**', component: PageNotFoundComponent }
];
/*=========================================================*/
let providers = {
    "google": { "clientId": "149768751354-hju5oi3aj7chv4vvp72ma4l969b4lar8.apps.googleusercontent.com" }, // dev test
    "facebook": {"clientId": "1418941908251496","apiVersion": "v2.5"},
    // "twitter": {"clientId": "zv7wyk2XLAsVG3RmKzlDFln3O"}   //  Dev Auth app

  };
/*=========================================================*/
export function getToken(){return localStorage.getItem('token')}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,LoginComponent,NavbarComponent,HeaderComponent,FooterComponent,
    HomeComponent,PageNotFoundComponent, ImgComponent, SearchComponent, PostAdComponent,
     AdsListComponent, AdDetailsComponent, RegisterComponent, AdsSearchComponent, AboutComponent, HowItWorksComponent,
      ContactComponent, MyAccountComponent, StrLimitPipe, MyAdsComponent, ProfileComponent, FavAdsComponent,
       ActivePhoneComponent, ForgetPasswordComponent, ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),OwlModule,Angular2SocialLoginModule,
    JwtModule.forRoot({config:{tokenGetter: getToken  }}),
    Ng2PaginationModule,/*Ng2ImgToolsModule,*/CurrencyMaskModule,ShareButtonModule.forRoot()
  ],
  providers: [AuthService,AuthGuard,GvarsService,AdminGuard,APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
