import { Controller, Get, Post, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movies } from './entities/movies.entity';

@Controller('api/v1')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  //   a) GET /api/v1/longest-duration-movies
  // This route returns as JSON the top 10 movies with the longest runTime
  // The output should contain tconst, primaryTitle, runtimeMinutes & genres
  @Get('longest-duration-movies')
  async getLongestDurationMovies(): Promise<Movies[]> {
    return await this.moviesService.getLongestDurationMovies();
  }

  //   b) POST /api/v1/new-movie
  // This route takes JSON as input for new movie and saves it into the database
  // On successful save, it returns “success
  @Post('new-movie')
  async createMovie(@Body() movieData: Partial<Movies>): Promise<string> {
    return await this.moviesService.createMovie(movieData);
  }

  //   c) GET /api/v1/top-rated-movies
  // This route returns as JSON the movies with an averageRating > 6.0, in sorted
  // order by averageRating
  // The output should contain tconst, primaryTitle, genre & averageRating.
  @Get('top-rated-movies')
  async getTopRatedMovies(): Promise<Movies[]> {
    return await this.moviesService.getTopRatedMovies();
  }

  //   d) GET /api/v1/genre-movies-with-subtotals
  // Show a list of all movies genre-wise with Subtotals of their numVotes.
  // The calculation of subtotals should be done in SQL query; not the API code
  @Get('genre-movies-with-subtotals')
  async getGenreMoviesWithSubtotals(): Promise<any[]> {
    return await this.moviesService.getGenreMoviesWithSubtotals();
  }

  //   e) POST /api/v1/update-runtime-minutes
  // Increment runtimeMinutes of all Movies using only SQL query (not in API code).
  // Increment runtimeMinutes by :
  // 15 if genre = Documentary
  // 30 if genre = Animation
  // 45 for the rest
  @Post('update-runtime-minutes')
  async updateRuntimeMinutes() {
    return await this.moviesService.updateRuntimeMinutes();
  }
}
