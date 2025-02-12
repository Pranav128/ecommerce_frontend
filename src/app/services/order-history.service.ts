import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private baseUrl = environment.apiUrl;
  private orderUrl = this.baseUrl + '/orders';
  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
    // need to build URL based on the customer email
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}
