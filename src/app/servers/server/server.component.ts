import { Component, OnInit, OnDestroy } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit, OnDestroy {
  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  server: { id: number; name: string; status: string };
  paramsSubs: Subscription;

  ngOnInit() {
    this.paramsSubs = this.route.data.subscribe((data: Data) => {
      this.server = data["server"];
    });
    // const id = +this.route.snapshot.params["serverId"];
    // this.server = this.serversService.getServer(id);
    // this.paramsSubs = this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params["serverId"]);
    // });
  }

  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }
}
