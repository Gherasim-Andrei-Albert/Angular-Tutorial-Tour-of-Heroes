import { NgModule } from "@angular/core";
import { HeroesComponent } from "./heroes/heroes.component";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailsComponent } from "./hero-details/hero-details.component";

const routes: Routes = [
  { path: "heroes", component: HeroesComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "heroes/:id", component: HeroDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
