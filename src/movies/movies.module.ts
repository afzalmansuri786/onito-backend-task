import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './entities/movies.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  exports: [MoviesService],
  providers: [
    MoviesService,
    {
      provide: 'MOVIES_REPOSITORY',
      useClass: Movies,
    },
  ],
  controllers: [MoviesController],
})
export class MovieModule {}
