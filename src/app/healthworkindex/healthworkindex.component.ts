import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Router } from '@angular/router';

import { HealthWork } from "../health-work";
import { HealthWorkDomain } from "../health-work-domain";
import { ApiService } from "../api.service";

export interface DialogData {
  user: string;
}



@Component({
  selector: "app-healthworkindex",
  templateUrl: "./healthworkindex.component.html",
  styleUrls: ["./healthworkindex.component.css"]
})
export class HealthworkindexComponent implements OnInit {
  healthWorkIndex: HealthWork;

  constructor(
    public dialogRef: MatDialogRef<HealthworkindexComponent>,
    private apiService: ApiService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.healthWorkIndex = new HealthWork();
  }

  getDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.healthWorkIndex.date = event.value;
  }

  saveHealthWorkIndex() {
    console.log("date : " + this.healthWorkIndex.date);
    console.log("healthIndex : " + this.healthWorkIndex.healthIndex);
    console.log("workIndex : " + this.healthWorkIndex.workIndex);
    var healthWorkDomain = new HealthWorkDomain(
      this.healthWorkIndex.date,
      this.healthWorkIndex.healthIndex,
      this.healthWorkIndex.workIndex, this.data.user
    );

    this.apiService.save(healthWorkDomain).subscribe(() => {
      console.log("Saved !!!!");
      //this.router.navigate(["app-user-dashboard"]);
      this.dialogRef.close();
      this.router.navigate(["app-user-dashboard/" + this.data.user]);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getWorkIndexEvent(event: any) {
    this.healthWorkIndex.workIndex = event.value;
  }

  getHealthIndexEvent(event: any) {
    this.healthWorkIndex.healthIndex = event.value;
  }
}
