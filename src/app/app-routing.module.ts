import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateSkillComponent } from './skills/create-skill/create-skill.component';
import { DeleteSkillComponent } from './skills/delete-skill/delete-skill.component';
import { ListSkillsComponent } from './skills/list-skills/list-skills.component';
import { UpdateSkillComponent } from './skills/update-skill/update-skill.component';
import { ViewSkillComponent } from './skills/view-skill/view-skill.component';

const routes: Routes = [
  {
    path:'profile',
    component:ProfileComponent
    // ,canActivate:[MsalGuard]
  },
  {
    path:'',
    component:ListSkillsComponent
    // ,canActivate:[MsalGuard]
  },
  {
    path:'create',component:CreateSkillComponent
    // ,canActivate:[MsalGuard]
  }, 
  {
    path:'list',component:ListSkillsComponent
    // ,canActivate:[MsalGuard]
  },
  {
    path:'update',component:UpdateSkillComponent
    // ,canActivate:[MsalGuard]
  },
  {
    path:'delete',component:DeleteSkillComponent
    // ,canActivate:[MsalGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      initialNavigation: 'enabledBlocking'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
