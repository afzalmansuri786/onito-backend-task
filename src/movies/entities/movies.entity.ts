import { Entity, Column, DataSource, PrimaryColumn, OneToMany } from 'typeorm';
import { Ratings } from './ratings.entity';

@Entity({ name: 'movies' })
export class Movies {
  @PrimaryColumn({ type: 'text' })
  tconst: string;

  @Column({ type: 'text', nullable: true })
  titleType: string;

  @Column({ type: 'text', nullable: true })
  primaryTitle: string;

  @Column({ type: 'text', nullable: true })
  runtimeMinutes: string;

  @Column({ type: 'text', nullable: true })
  genres: string;

  @OneToMany(() => Ratings, (ratings) => ratings.tconst, {
    eager: true,
    nullable: true,
  })
  ratings: Ratings;
}

export const MovieProviders = [
  {
    provide: 'MOVIES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Movies),
    inject: ['DATA_SOURCE'],
  },
];
