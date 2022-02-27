import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkComponent } from './pages/work/work.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { NgParticlesModule } from 'ng-particles';
import { MatIconModule } from '@angular/material/icon';
import { ShellComponent } from './components/shell/shell.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkComponent,
    SkillsComponent,
    AboutComponent,
    ContactComponent,
    SidebarComponent,
    CardComponent,
    ShellComponent,
    ValidationErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
