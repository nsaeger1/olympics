export namespace OlympicCountry {
  export type Country = {
    id: number;
    country: string;
    gold: number;
    silver: number;
    bronze: number;
  };

  export class CountryAward {
    id: number;
    country: string;
    gold: number;
    silver: number;
    bronze: number;

    constructor(data: Country) {
      this.id = data.id;
      this.country = data.country;
      this.gold = data.gold;
      this.silver = data.silver;
      this.bronze = data.bronze;
    }

    totalMedals() {
      return this.gold + this.silver + this.bronze;
    }
  }
}
