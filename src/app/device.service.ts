import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Device } from "./device"

@Injectable({
  providedIn: 'root'
})

export class DeviceService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getDevices(): Observable<Device[]> {
    return this.http.get<any>(`${this.apiServerUrl}/device/getall`);
  }
}
