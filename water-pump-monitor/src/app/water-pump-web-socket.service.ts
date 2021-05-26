import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WEBSOCKET_ENDPOINT, WEBSOCKET_NOTIFY_TOPIC } from './shared/constants/base-url.constants';
import { Observable, of } from 'rxjs';
import { ReadingsServiceService } from './readings-service.service';


@Injectable({
  providedIn: 'root'
})
export class WaterPumpWebSocketService {

  stompClient: any;
  
  constructor(private readingsService:ReadingsServiceService) { }

  connect(): void {
    console.log('webSocket Connection');
    const ws = new SockJS(WEBSOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function(frame) {
        _this.stompClient.subscribe(WEBSOCKET_NOTIFY_TOPIC, function(sdkEvent) {
            _this.onMessageReceived(sdkEvent);
        });
    }, this.errorCallBack);
}


  disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

   // on error, schedule a reconnection attempt
   errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
        this.connect();
    }, 5000);
}
  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
    this.readingsService.eventEmiter.emit(message);
  }
}
