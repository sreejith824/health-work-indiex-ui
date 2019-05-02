import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { HealthWorkDomain } from "./health-work-domain";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: "root"
})
export class ApiService {


    constructor(private httpClient: HttpClient) { }

    fetch(user: string, period: string): Observable<HealthWorkDomain[]> {
        var dataURL: string = environment.endpoint + "search?user=" + user + "&period=" + period;
        return <Observable<HealthWorkDomain[]>>this.httpClient.get(dataURL);
    }

    save(healthWorkDomain: HealthWorkDomain) {
        console.log (healthWorkDomain.date);
        var dataURL: string = environment.endpoint;
        return this.httpClient.post(dataURL, healthWorkDomain);
    }

    fetchTeam(period: string, date: number): Observable<HealthWorkDomain[]> {
        console.log(date);
        var dataURL: string = environment.endpoint + "search?period=" + period + "&date=" + date;
        return <Observable<HealthWorkDomain[]>>this.httpClient.get(dataURL);
    }
}
