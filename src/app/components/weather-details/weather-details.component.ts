import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {
  weather!: Weather;
  location: string | null = null;
  date!: string | number | Date;
  sunrise!: string | number | Date;
  sunset!: string | number | Date;
  hourlyForecast: any;
  dailyForecast: any;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.location = params.get('location');
      if (!this.location) {
        this.getLocation();
      } else {
        this.getWeatherByLocation(this.location);
      }
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.getWeather(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  getWeather(latitude: number, longitude: number) {
    this.weatherService.getWeatherByCoords(latitude, longitude).subscribe(
      (data: any) => {
        this.weather = data;

      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getWeatherByLocation(location: string) {
    this.weatherService.getWeatherByLocation(location).subscribe(
      (data: any) => {
        this.weather = data;
        this.date = new Date();
        this.sunrise = this.weather.sunrise;
        this.sunset = this.weather.sunset;
        this.hourlyForecast = this.weather.windSpeed;
        this.dailyForecast = this.weather.feelsLike;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
