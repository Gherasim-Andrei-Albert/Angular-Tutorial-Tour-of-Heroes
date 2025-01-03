import { Component, OnInit } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-hero-details",
  templateUrl: "./hero-details.component.html",
  styleUrls: ["./hero-details.component.css"]
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    const id: number = Number(this.route.snapshot.paramMap.get("id"));

    this.heroService.getHero(id).subscribe((hero: Hero) => (this.hero = hero));
  }

  back() {
    this.location.back();
  }

  save() {
    this.heroService.update(this.hero).subscribe(() => this.back());
  }
}
