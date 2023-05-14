import { Injectable } from '@nestjs/common';
import { Movies } from './entities/movies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
  ) {}

  async getLongestDurationMovies(): Promise<Movies[]> {
    try {
      const runtimeMinutes = await this.movieRepository.query(
        `SELECT movies.tconst,movies."primaryTitle",movies."runtimeMinutes",movies.genres
          FROM movies
          ORDER BY movies."runtimeMinutes"::INTEGER DESC limit 10;`,
      );
      return runtimeMinutes;
    } catch (error) {
      console.log(error);
    }
  }

  async createMovie(movieData: Partial<Movies>): Promise<string> {
    try {
      const movieCreate = await this.movieRepository.create(movieData);
      await this.movieRepository.save(movieCreate);
      return 'success';
    } catch (error) {
      console.log(error);
    }
  }

  //c) GET /api/v1/top-rated-movies
  // This route returns as JSON the movies with an averageRating > 6.0, in sorted
  // order by averageRating
  // The output should contain tconst, primaryTitle, genre & averageRating.
  async getTopRatedMovies(): Promise<Movies[]> {
    try {
      const getTopRatedMovies = await this.movieRepository
        .query(`SELECT m.tconst, m."primaryTitle", m.genres, r."averageRating"
        FROM public.movies AS m, public.ratings AS r
        WHERE CAST(r."averageRating" AS numeric) > 6.0
        AND m.tconst = r.tconst
        ORDER BY r."averageRating" ASC;`);
      return getTopRatedMovies;
    } catch (error) {
      console.log(error);
    }
  }

  async getGenreMoviesWithSubtotals(): Promise<any[]> {
    try {
      const query2 = `SELECT
      CASE WHEN m."primaryTitle" IS NULL THEN '' ELSE COALESCE(m."genres", '') END AS genres,
      COALESCE(m."primaryTitle", 'Total') AS primaryTitle,
      SUM(CAST(r."numVotes" AS integer)) AS numVotes
    FROM
      (
        SELECT DISTINCT "primaryTitle", "genres", tconst
        FROM public.movies
        WHERE "primaryTitle" IS NOT NULL
      ) AS m
    JOIN
      public.ratings AS r ON m.tconst = r.tconst
    GROUP BY
      ROLLUP (m."genres", m."primaryTitle")
    HAVING
      COALESCE(m."genres", '') <> 'Total'
    ORDER BY
      CASE WHEN m."genres" = 'Total' THEN 1 ELSE 0 END,
      CASE WHEN m."primaryTitle" = 'Total' THEN 1 ELSE 0 END,
      m."genres" DESC NULLS LAST,
      numVotes ASC;
  `;
      const subTotalWithGenreAndPrimaryTitle = await this.movieRepository.query(
        query2,
      );
      return subTotalWithGenreAndPrimaryTitle;
    } catch (error) {
      console.log(error);
    }
  }

  async updateRuntimeMinutes() {
    try {
      await this.movieRepository.query(`
      UPDATE public.movies
      SET "runtimeMinutes" = CASE
        WHEN genres = 'Documentary' THEN 15
        WHEN genres = 'Animation' THEN 30
        ELSE 45
      END::text;
    `);
      return 'success';
    } catch (error) {
      console.log(error);
    }
  }
}
