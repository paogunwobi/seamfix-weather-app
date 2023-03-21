import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  weather!: Weather;
  location = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getLocation();
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

  search() {
    if (this.location) {
      this.getWeatherByLocation(this.location);
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
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
