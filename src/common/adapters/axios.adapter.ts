import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';

import { HttpsAdapter } from "../interfaces/https-adapters.interface";

@Injectable()
export class AxiosAdapter implements HttpsAdapter {

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error('Check logs to know the error: ' + error);
        }
    }
}