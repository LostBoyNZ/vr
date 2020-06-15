import * as moment from "moment";
import {Moment} from 'moment';

export enum AddressTypes {
  PHYSICAL = "Physical",
  POSTAL = "Postal",
}

export class ApiCaller {
  private static urlAddressChecker = 'https://api.nzpost.co.nz/addresschecker/1.0/';
  private static clientId = '8ab77698b7934e2e9ff661b69846f08b';
  //private static bearerToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IlRFU1QiLCJwaS5hdG0iOiIxIn0.eyJzY29wZSI6W10sImNsaWVudF9pZCI6IjhhYjc3Njk4Yjc5MzRlMmU5ZmY2NjFiNjk4NDZmMDhiIiwiZXhwIjoxNTkwODMzMTYzfQ.Q8U-BbQeB7TWWhwQ3iaOT2X40ePefdi841Yk30qBLig';
  private static bearerToken;
  private static bearerTokenLastRequested: Moment;

  constructor() {}

  static async getAddressSuggestions(query: string) {
    if (!this.bearerToken) {
      await this.renewAccessToken();
    }

    if (this.bearerToken) {
      let headers = new Headers();
      headers.append("client_id", this.clientId);
      headers.append("Accept", "application/json");
      headers.append("Authorization", `Bearer ${this.bearerToken}`);

      const requestOptions = {
        method: 'GET',
        headers: headers,
      };

      const url = `${this.urlAddressChecker}suggest?q=${query}&max=10`;

      let body;
      let response = await fetch(url, requestOptions);
      if (response.ok) { // if HTTP-status is 200-299
        body = await response.json();
      } else {
        console.log("HTTP-Error: " + response.status);
      }

      return body['addresses'];
    } else {
      console.error('No access token');
    }
  }

  static async setupBearerTokenIfNotAlreadySet() {
    if (!this.bearerToken) {
      await this.renewAccessToken();
    }
  }

  static async renewAccessToken() {
    const minTimeForNewRequest = moment(this.bearerTokenLastRequested).add(30, 'seconds');
    if (this.bearerTokenLastRequested && this.bearerTokenLastRequested.isBefore(minTimeForNewRequest)) {
      return '';
    }

    this.bearerTokenLastRequested = moment();
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Cookie", "PF=wlNkzk3XpaYOBjruV3U774");

    let urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", this.clientId);
    urlencoded.append("client_secret", "687B3f5Ba041421583b52468ACFB29fb");

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: urlencoded,
    };

    // TODO: REMOVE THIS PROXY URL WHEN NOT RUNNING ON LOCALHOST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO: REMOVE THIS PROXY URL WHEN NOT RUNNING ON LOCALHOST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO: REMOVE THIS PROXY URL WHEN NOT RUNNING ON LOCALHOST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // TODO: REMOVE THIS PROXY URL WHEN NOT RUNNING ON LOCALHOST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://oauth.nzpost.co.nz/as/token.oauth2';

    let body;
    let response = await fetch(proxyUrl + url, requestOptions);
    if (response.ok) { // if HTTP-status is 200-299
      body = await response.json();
    } else {
      console.log("HTTP-Error: " + response.status);
    }

    if (body && body["access_token"]) {
      this.bearerToken = body["access_token"];
    } else {
      console.error('No access token granted');
    }
  }
}
