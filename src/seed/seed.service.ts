import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import axios, {AxiosInstance} from 'axios';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interface/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios:AxiosInstance = axios;

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>

  ) { }

 async addSeed() {
   const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800')
  
    data.results.forEach(async({name, url}) => {
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      
      const pokemon = await this.pokemonModel.create({name, no, url});
   })

   return 'Seeded';
  }
}
