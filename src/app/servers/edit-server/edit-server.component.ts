import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";

import { ServersService } from "../servers.service";
import { CanComponentDeactivate } from "./can-deactivate-guard.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;
  fragmentSubs: Subscription;
  queryParamsSubs: Subscription;
  changedSave = false;

  ngOnInit() {
    this.queryParamsSubs = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams["allowEdit"] === "1" ? true : false;
      }
    );
    this.fragmentSubs = this.route.fragment.subscribe();
    const id = +this.route.snapshot.params["serverId"];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changedSave = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changedSave
    ) {
      return confirm("Do you want to discard changes?");
    } else {
      return true;
    }
  }

  ngOnDestroy() {
    this.fragmentSubs.unsubscribe();
    this.queryParamsSubs.unsubscribe();
  }
}
