export type Country = {
  id: number;
  country: string;
  medals: number;
};

export class CountryAward {
  id: number;
  country: string;
  medals: number;

  constructor(data: Country) {
    this.id = data.id;
    this.country = data.country;
    this.medals = data.medals;
  }
}
