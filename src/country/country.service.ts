import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    
    const response = await firstValueFrom(
      this.httpService
        .get(process.env.FIND_MANY_COUNTRYS)
        .pipe(map((response) => response)),
    );

    if (response.status !== 200) {
      throw new InternalServerErrorException('Internal server error.');
    }
    return response.data;
  }

  async findOne(code: string) {
    const response = await firstValueFrom(
      this.httpService
        .get(`${process.env.FIND_ONE_COUNTRY}${code}`)
        .pipe(map((response) => response)),
    );

    if (response.status !== 200) {
      throw new InternalServerErrorException('Internal server error.');
    }

    const findPopulation = await this.findPopulation(code);

    const findFlag = await this.findFlag(code);

    return {
      ...response.data,
      flag: findFlag,
      populationCounts: findPopulation,
    };
  }

  async findPopulation(code: string) {
    const response = await firstValueFrom(
      this.httpService
      .get(`${process.env.FIND_POPULATION}`)
        .pipe(map((response) => response)),
    );

    if (response.status !== 200) {
      throw new InternalServerErrorException('Internal server error.');
    }

    const populationCounts = response.data.data.filter((country: any) => {
      return country.code === code;
    });

    return populationCounts[0].populationCounts;
  }

  async findFlag(code: string) {
    const response = await firstValueFrom(
      this.httpService
        .get(`${process.env.FIND_FLAG}`)
        .pipe(map((response) => response)),
    );

    if (response.status !== 200) {
      throw new InternalServerErrorException('Internal server error.');
    }

    const populationCounts = response.data.data.filter((country: any) => {
      return country.iso3 === code;
    });

    return populationCounts[0].flag;
  }
}
