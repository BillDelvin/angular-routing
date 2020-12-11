import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) {}

  user: { id: number; name: string };
  paramsSubs: Subscription;

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["userId"],
      name: this.route.snapshot.params["userName"],
    };

    this.paramsSubs = this.route.params.subscribe((params: Params) => {
      this.user.id = params["userId"];
      this.user.name = params["userName"];
    });
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }
}
