import { Show } from "./show";

export class Movie {
  private movieId: string;
  private title: string;
  private description: string;
  private durationMins: number;
  private language: string;
  private releaseDate: Date;
  private genre: string;
  private shows: Show[] = [];

  constructor(
    movieId: string,
    title: string,
    description: string,
    durationMins: number,
    language: string,
    releaseDate: Date,
    genre: string
  ) {
    this.movieId = movieId;
    this.title = title;
    this.description = description;
    this.durationMins = durationMins;
    this.language = language;
    this.releaseDate = releaseDate;
    this.genre = genre;
  }

  public getMovieId(): string {
    return this.movieId;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getDurationMins(): number {
    return this.durationMins;
  }

  public setDurationMins(durationMins: number): void {
    this.durationMins = durationMins;
  }

  public getLanguage(): string {
    return this.language;
  }

  public setLanguage(language: string): void {
    this.language = language;
  }

  public getReleaseDate(): Date {
    return this.releaseDate;
  }

  public getGenre(): string {
    return this.genre;
  }

  public setGenre(genre: string): void {
    this.genre = genre;
  }

  public addShow(show: Show): void {
    this.shows.push(show);
  }

  public getShows(): Show[] {
    return this.shows;
  }
}
