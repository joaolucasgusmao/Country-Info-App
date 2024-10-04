import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('countries')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all countries' })
  @ApiResponse({ status: 200, description: 'List of countries' })
  findAll() {
    return this.countryService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a country by code' }) 
  @ApiParam({ name: 'code', required: true, description: 'Country code' }) 
  @ApiResponse({ status: 200, description: 'Country details' }) 
  @ApiResponse({ status: 404, description: 'Country not found' })
  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.countryService.findOne(code);
  }
}
