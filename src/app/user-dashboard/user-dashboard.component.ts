import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ActivatedRoute } from "@angular/router";

import { HealthWork } from "../health-work";
import { HealthWorkDomain } from "../health-work-domain";
import { HealthworkindexComponent } from "../healthworkindex/healthworkindex.component";
import { ApiService } from "../api.service";

@Component({
    selector: "app-user-dashboard",
    templateUrl: "./user-dashboard.component.html",
    styleUrls: ["./user-dashboard.component.css"]
})
export class UserDashboardComponent implements OnInit {
    chartType: string;
    chartData;
    chartColumns;
    chartOption;
    healthWorkData: HealthWork[];
    user: string;
    errorMessage: string;
    hasData: boolean;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private apiService: ApiService,
        public route: ActivatedRoute
    ) {
        this.chartColumns = [
            "Date",
            "Feel Good",
            "Work occupied"
        ];
        this.chartData = [];
        this.overrideRouteReuseStrategy();
    }

    ngOnInit() {
        this.route.paramMap.forEach(x => {
            this.user = x["params"].user;
        });

        this.chartType = "LineChart";
        this.chartOption = this.getChartOption();
        var chartData = [];
        this.apiService
            .fetch(this.user, "week")
            .subscribe((healthWorkDomainArray: HealthWorkDomain[]) => {
                if (healthWorkDomainArray && healthWorkDomainArray.length > 0) {
                    healthWorkDomainArray.forEach(healthWorkDomain => {
                        var chartDataElement = [
                            new Date(healthWorkDomain.date).toDateString(),
                            healthWorkDomain.healthindex,
                            healthWorkDomain.workindex
                        ];
                        chartData.push(chartDataElement);
                    });
                    this.chartData = chartData;
                    this.hasData = true;
                } else {
                    this.errorMessage =
                        "How is your day today; Please log your day by clicking + !!";
                    this.hasData = false;
                }
            });
        console.log(this.chartData);
    }

    getChartOption() {
        var chartOption = {
            title: "Hi " + this.user + ", This is how your week looks like!!",
            curveType: "function",
            legend: { position: "right" },
            width: 1200,
            height: 600,
            vAxis: {
                minValue: 0, maxValue: 10, title: 'Feel Good (Y - Axis)',
                titleTextStyle: {
                    color: 'blue'
                }
            },
            hAxis: {
                minValue: 0, maxValue: 10, title: 'Work Occupied (X - Axis)',
                titleTextStyle: {
                    color: 'red'
                }
            }
        };
        return chartOption;
    }

    getHealthWorkData() {
        var chartData = [];
        this.apiService
            .fetch(this.user, "week")
            .subscribe((healthWorkDomainArray: HealthWorkDomain[]) => {
                healthWorkDomainArray.forEach(healthWorkDomain => {
                    var chartDataElement = [
                        new Date(healthWorkDomain.date).toDateString(),
                        healthWorkDomain.healthindex,
                        healthWorkDomain.workindex
                    ];
                    chartData.push(chartDataElement);
                });
                this.chartData = chartData;
            });
    }
    addWorkHealthIndex() {
        //this.router.navigate(["overview", id]);
        this.openDialog();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(HealthworkindexComponent, {
            width: "600px",
            height: "400px",
            data: { user: this.user }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("The dialog was closed");
        });
    }

    overrideRouteReuseStrategy() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.router.events.subscribe(evt => {
            if (evt instanceof NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
                // if you need to scroll back to top, here is the right place
                window.scrollTo(0, 0);
            }
        });
    }
}
