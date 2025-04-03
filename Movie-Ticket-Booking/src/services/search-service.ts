import { City } from "../models/location/city";
import { Theatre } from "../models/location/theatre";
import { Movie } from "../models/show/movie";
import { Show } from "../models/show/show";

// Singleton service to handle search operations
export class SearchService {
  private static instance: SearchService;
  private cities: City[] = [];
  private movies: Movie[] = [];

  private constructor() {
    // Private constructor for singleton pattern
  }

  // Get singleton instance
  public static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  public addCity(city: City): void {
    this.cities.push(city);
  }

  public addMovie(movie: Movie): void {
    this.movies.push(movie);
  }

  public getAllCities(): City[] {
    return this.cities;
  }

  public searchCities(name: string): City[] {
    const searchTerm = name.toLowerCase();
    return this.cities.filter((city) =>
      city.getName().toLowerCase().includes(searchTerm)
    );
  }

  public searchTheatresByCity(cityName: string): Theatre[] {
    const results: Theatre[] = [];

    for (const city of this.cities) {
      if (city.getName().toLowerCase().includes(cityName.toLowerCase())) {
        results.push(...city.getTheatres());
      }
    }

    return results;
  }

  public searchMovies(criteria: {
    title?: string;
    language?: string;
    genre?: string;
    releaseDate?: Date;
    city?: string;
  }): Movie[] {
    let results = this.movies;

    if (criteria.title) {
      const searchTerm = criteria.title.toLowerCase();
      results = results.filter((movie) =>
        movie.getTitle().toLowerCase().includes(searchTerm)
      );
    }

    if (criteria.language) {
      const searchTerm = criteria.language.toLowerCase();
      results = results.filter(
        (movie) => movie.getLanguage().toLowerCase() === searchTerm
      );
    }

    if (criteria.genre) {
      const searchTerm = criteria.genre.toLowerCase();
      results = results.filter((movie) =>
        movie.getGenre().toLowerCase().includes(searchTerm)
      );
    }

    if (criteria.releaseDate) {
      results = results.filter((movie) => {
        const movieDate = movie.getReleaseDate();
        const criteriaDate = criteria.releaseDate!;

        return (
          movieDate.getFullYear() === criteriaDate.getFullYear() &&
          movieDate.getMonth() === criteriaDate.getMonth() &&
          movieDate.getDate() === criteriaDate.getDate()
        );
      });
    }

    if (criteria.city) {
      const cityName = criteria.city.toLowerCase();
      results = results.filter((movie) => {
        for (const show of movie.getShows()) {
          const theatre = show.getScreen().getTheatre();
          const city = theatre.getCity();

          if (city.getName().toLowerCase().includes(cityName)) {
            return true;
          }
        }

        return false;
      });
    }

    return results;
  }

  public getShowsForMovie(movie: Movie): Show[] {
    return movie.getShows();
  }

  public getShowsForMovieInCity(movie: Movie, cityName: string): Show[] {
    const citySearchTerm = cityName.toLowerCase();

    return movie.getShows().filter((show) => {
      const theatre = show.getScreen().getTheatre();
      const city = theatre.getCity();

      return city.getName().toLowerCase().includes(citySearchTerm);
    });
  }

  public getShowsForMovieInTheatre(movie: Movie, theatre: Theatre): Show[] {
    return movie.getShows().filter((show) => {
      return show.getScreen().getTheatre() === theatre;
    });
  }

  public getUpcomingShows(): Show[] {
    const now = new Date();
    const allShows: Show[] = [];

    // Collect all shows
    for (const movie of this.movies) {
      allShows.push(...movie.getShows());
    }

    return allShows.filter((show) => show.getStartTime() > now);
  }
}
