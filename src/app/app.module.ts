import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SimulationComponent } from './simulation/simulation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ConsoleComponent } from "./console/console.component";
import { ProjectCardComponent } from './project-card/project-card.component';
import { HexComponent } from './hex/hex.component';
import { SkillsComponent } from './skills/skills.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MilestoneCardComponent } from './milestone-card/milestone-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HexComponent,
        SimulationComponent,
        ModalComponent,
        PortfolioComponent,
        AboutComponent,
        ContactComponent,
        ConsoleComponent,
        TimelineComponent,
        ProjectCardComponent,
        MilestoneCardComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,

        SkillsComponent,
        FontAwesomeModule,
        
    ]
})
export class AppModule { }
