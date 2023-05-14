import {
  Entity,
  Column,
  DataSource,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Movies } from './movies.entity';

@Entity()
export class Ratings {
  @PrimaryColumn({ type: 'text' })
  @ManyToOne(() => Movies, (movies) => movies.tconst, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'tconst' })
  tconst: string;

  @Column({ type: 'text', nullable: true })
  averageRating: string;

  @Column({ type: 'text', nullable: true })
  numVotes: string;
}

export const RatingsProviders = [
  {
    provide: 'RATINGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ratings),
    inject: ['DATA_SOURCE'],
  },
];
