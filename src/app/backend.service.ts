import { Injectable } from '@angular/core';

// Import HttpClient from @angular/common/http
import {HttpClient} from '@angular/common/http';


interface PaginatedResult<T> {
  total_count: number;
  from: number;
  to: number;
  results: T[];
}

interface Item {
  name: string;
  item_id: number;
  category: string;
  cost_cents: number;
}

interface User {
  username: string;
  user_id: number;
  is_billed: boolean;
}

interface Purchase {
  unique_id: number;
  timestamp_epoch_millis: number;
  item_id: number;
  consumer_id: number;
}

interface AppState {
top_users: ParametersTopUsers;
all_users: ParametersAllUsers;
all_items: ParametersAllItems;
global_log: ParametersPurchaseLogGlobal;
top_personal_drinks: ParametersTopPersonalDrinks;
personal_log: ParametersPurchaseLogPersonal;
personal_detail_infos: ParametersDetailInfoForUser;
}

interface ParametersSearchterm {
  searchterm: string;
}

interface ParametersPagination {
  start_inclusive: number;
  end_exclusive: number;
}

interface ParametersTopUsers {
  n: number;
}

interface ParametersAllUsers {
  count_pars: ParametersSearchterm;
  pagination: ParametersPagination;
}

interface ParametersAllItems {
  count_pars: ParametersSearchterm;
  pagination: ParametersPagination;
}

interface Timespan {
  millis_start: number;
  millis_end: number;
}

interface TimespanWithUserId {
  user_id: number;
  millis_start: number;
  millis_end: number;

}

interface ParametersPurchaseLogGlobal {
  count_pars: Timespan;
  pagination: ParametersPagination;
}

interface ParametersTopPersonalDrinks {
  user_id: number;
  n: number;
}

interface ParametersPurchaseLogPersonal {
  count_pars: TimespanWithUserId;
  pagination: ParametersPagination;
}

interface ParametersDetailInfoForUser {
  user_id: number;
}





const endpoint_topusers = '/api/users/top';
const endpoint_allusers = '/api/users/all';
const endpoint_topitems = '/api/items/top';
const endpoint_allitems = '/api/items/all';
const endpoint_personallog = '/api/purchases/personal';
const endpoint_globallog = '/api/purchases/global';
const endpoint_userdetails = '/api/users/detail';
const post_endpoint_simple_purchase = '/api/purchases';

@Injectable()
export class BackendService {

  viewstate: AppState;

  constructor(private http: HttpClient) { }


  callhttp(): void {

    const queryjson = encodeURIComponent(JSON.stringify(this.viewstate.top_users));
    // Make the HTTP request:
    this.http.get<PaginatedResult<User>>(endpoint_topusers, {params: {query: queryjson}}).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
    });
  }

}
