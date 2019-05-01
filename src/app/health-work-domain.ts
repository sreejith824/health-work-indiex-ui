export class HealthWorkDomain {
  constructor(
    date?: Date,
    healthindex?: number,
    workindex?: number,
    user?: string
  ) {
    this.date = date;
    this.healthindex = healthindex;
    this.workindex = workindex;
    this.user = user;
  }

  _id : string;
  user: string;
  healthindex: number;
  workindex: number;
  date: Date;
}
