import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AzureaddemoService } from './azureaddemo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from './layout/layout.module';
import { SkillsModule } from './skills/skills.module';
import { MatFormFieldModule } from '@angular/material/form-field';

const IsIE=window.navigator.userAgent.indexOf('MSIE')>1
||window.navigator.userAgent.indexOf('Trident/')>1

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    LayoutModule,
    SkillsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    MatFormFieldModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth:{
          clientId:'63e3ddc8-ed9f-43fb-b9a9-47bbf33c7687',
          redirectUri:'http://localhost:4200',
          authority:'https://login.microsoftonline.com/892883b0-47de-49df-b683-d0a83e9bb1fd'
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

    ),
    BrowserAnimationsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true

  },MsalGuard,AzureaddemoService],
  bootstrap: [AppComponent,MsalRedirectComponent]
  
})
export class AppModule { }
