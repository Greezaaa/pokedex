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
 await this.pokemonModel.deleteMany({});


   const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800')
   
   const pokemonToInsert: {name: string, url: string, no: number}[] = []; 
   
    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no:number = +segments[segments.length - 2];
      
      pokemonToInsert.push({name, url, no})


   });

   await this.pokemonModel.insertMany(pokemonToInsert);

   return 'Seeded';
  }
}
