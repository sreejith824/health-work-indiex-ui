import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { ActivatedRoute } from "@angular/router";

import { ApiService } from "../api.service";
import { HealthWorkDomain } from "../health-work-domain";

@Component({
    selector: 'app-team-dashboard',
    templateUrl: './team-dashboard.component.html',
    styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit {

    chartType: string;
    chartData;
    chartColumns;
    chartOption;
    selectedDate: number;
    errorMessage: string;
    hasData: boolean;
    user: string;

    constructor(private apiService: ApiService, private route: ActivatedRoute) {
        this.chartData = [];
        this.selectedDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    }

    ngOnInit() {
        this.route.paramMap.forEach(x => {
            this.user = x["params"].user;
        });

        this.chartType = "BubbleChart";
        this.chartColumns = ['', "Hapiness", "Work", "Name"];
        this.chartOption = {
            title: "Team's dashboard for " + new Date(this.selectedDate).toDateString(),
            colorAxis: { colors: ['yellow', 'red'] },
            sizeAxis: { minValue: 5, maxSize: 5 },
            legend: { position: 'right' },
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
            },
            series: { visibleInLegend: false },
            height: 400,
            width: 1000
        };

        var chartData = [];
        this.apiService
            .fetchTeam("day", this.selectedDate)
            .subscribe((healthWorkDomainArray: HealthWorkDomain[]) => {
                if (healthWorkDomainArray && healthWorkDomainArray.length > 0) {
                    healthWorkDomainArray.forEach(healthWorkDomain => {
                        const chartDataElement = [
                            '',
                            healthWorkDomain.workindex,
                            healthWorkDomain.healthindex,
                            healthWorkDomain.user
                        ];
                        chartData.push(chartDataElement);
                    });
                    this.chartData = chartData;
                    this.hasData = true;
                } else {
                    this.errorMessage =
                        "Team have not entered their day for " + new Date(this.selectedDate).toDateString();
                    this.hasData = false;
                }
            });
        console.log(this.chartData);
    }

    getDate(type: string, event: MatDatepickerInputEvent<Date>) {
        this.selectedDate = event.value.getTime();
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        console.log(event);
        this.ngOnInit();
    }

}
