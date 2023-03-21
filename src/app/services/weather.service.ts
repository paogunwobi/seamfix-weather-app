import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather } from '../models/weather.model';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiUrl = 'https://api.openweathermap.org/data/2.5';
    private apiKey = 'your-api-key-here';

    constructor(private http: HttpClient) { }

    getWeatherByCoordsProd(latitude: number, longitude: number): Observable<Weather> {
        const url = `${this.apiUrl}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`;
        return this.http.get(url).pipe(
            map((response: any) => this.mapWeather(response))
        );
    }

    getWeatherByCoords(latitude: number, longitude: number): Observable<Weather> {
        // Hardcoded response for testing purposes
        const data = {
            name: 'New York',
            description: 'Partly cloudy',
            // icon: 'src/assets/weather-icon.jpg',
            icon: 'https://www.istockphoto.com/photos/partly-cloudy-day',
            temp: 10,
            tempMin: 8,
            tempMax: 12,
            feelsLike: 8,
            humidity: 80,
            windSpeed: 5,
            sunrise: new Date('2023-03-21T06:27:15.000Z'),
            sunset: new Date('2023-03-21T18:40:28.000Z')
        };
        return of(this.mapWeather(data));
    }

    getWeatherByLocationProd(location: string): Observable<Weather> {
        const url = `${this.apiUrl}/weather?q=${location}&units=metric&appid=${this.apiKey}`;
        return this.http.get(url).pipe(
            map((response: any) => this.mapWeather(response))
        );
    }

    getWeatherByLocation(location: string): Observable<Weather> {
        // Hardcoded response for testing purposes
        const data = {
            name: 'London',
            description: 'Rainy',
            icon: 'https://www.istockphoto.com/photos/partly-cloudy-day',
            temp: 8,
            tempMin: 6,
            tempMax: 10,
            feelsLike: 5,
            humidity: 90,
            windSpeed: 10,
            sunrise: new Date('2023-03-21T05:52:26.000Z'),
            sunset: new Date('2023-03-21T17:47:56.000Z')
        };
        return of(this.mapWeather(data));
    }

    private mapWeather(data: any): Weather {
        return data as Weather;
    }


    // private mapWeather(data: any): Weather {
    //     return {
    //         name: data.name,
    //         description: data.weather[0].description,
    //         icon: data.weather[0].icon,
    //         temp: data.main.temp,
    //         tempMin: data.main.temp_min,
    //         tempMax: data.main.temp_max,
    //         feelsLike: data.main.feels_like,
    //         humidity: data.main.humidity,
    //         windSpeed: data.wind.speed,
    //         sunrise: new Date(data.sys.sunrise * 1000),
    //         sunset: new Date(data.sys.sunset * 1000)
    //     };
    // }
}






