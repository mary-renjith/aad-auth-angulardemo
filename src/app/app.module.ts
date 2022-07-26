import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AzureaddemoService } from './azureaddemo.service';
const IsIE=window.navigator.userAgent.indexOf('MSIE')>1
||window.navigator.userAgent.indexOf('Trident/')>1

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth:{
          clientId:'e474d1a1-1285-4abb-8ad4-cceafd37b032',
          redirectUri:'http://localhost:4200',
          authority:'https://login.microsoftonline.com/a86bc255-9bb7-4ee8-b30a-51fba84872aa'
        },
        cache:
        {
          cacheLocation:'localstorage',
          storeAuthStateInCookie:true
        }
      }
    ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
        interactionType:InteractionType.Redirect,
        protectedResourceMap:new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.Read']]
          ]
        )
      }

    )
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true

  },MsalGuard,AzureaddemoService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
