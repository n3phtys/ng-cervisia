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

interface DetailInfo {
  consumed: object; //string to count number map
  last_bill_date: number;
  last_bill_cost: number;
  currently_cost: number;
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

interface SuccessContent {
  timestamp_epoch_millis: number;
  refreshed_data: AllResults;
}

interface ServerWriteResult {
  error_message: string;
  is_success: boolean;
  content: SuccessContent;
}

interface Bill {

}

interface Freeby {

}

interface  AllResults {
  DetailInfoForUser: PaginatedResult<DetailInfo>;
  TopUsers: PaginatedResult<User>;
  AllUsers: PaginatedResult<User>;
  AllItems: PaginatedResult<Item>;
  PurchaseLogGlobal: PaginatedResult<Purchase>;
  BillsCount: PaginatedResult<Bill>;
  Bills: PaginatedResult<Bill>;
  OpenFFAFreebies: PaginatedResult<Freeby>;
  TopPersonalDrinks: PaginatedResult<Item>;
  PurchaseLogPersonal: PaginatedResult<Purchase>;
  IncomingFreebies: PaginatedResult<Freeby>;
  OutgoingFreebies: PaginatedResult<Freeby>;

  computed_users_in_list: User[];
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

  viewstate: AppState = {
    top_users: {n: 40},
    all_users: {
      count_pars: {searchterm: ""},
      pagination: {
        start_inclusive: 0,
        end_exclusive: 400,
      }},
    all_items: null,
    global_log: null,
    top_personal_drinks: null,
    personal_log: null,    personal_detail_infos: null,
    };

  content: AllResults = {
  DetailInfoForUser: null,
  TopUsers: null,
  AllUsers: null,
  AllItems: null,
  PurchaseLogGlobal: null,
  BillsCount: null,
  Bills: null,
  OpenFFAFreebies: null,
  TopPersonalDrinks: null,
  PurchaseLogPersonal: null,
  IncomingFreebies: null,
  OutgoingFreebies: null,
    computed_users_in_list: [],
  };

  constructor(private http: HttpClient) { }


  callhttp(): void {

    const queryjson = encodeURIComponent(JSON.stringify(this.viewstate.top_users));
    // Make the HTTP request:
    this.http.get<PaginatedResult<User>>(endpoint_topusers, {params: {query: queryjson}}).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
    });
  }

  computeUsers() : void {
    if (this.viewstate.all_items.count_pars.searchterm.length > 0) {
      this.content.computed_users_in_list = this.content.AllUsers.results;
    } else {
      this.content.computed_users_in_list = this.content.TopUsers.results;
    }
  }

  updateUserlist(term : string) : void {
    this.viewstate.all_users.count_pars.searchterm = term;
    const queryjson = //encodeURIComponent
    (JSON.stringify(term.length > 0 ? this.viewstate.all_users : this.viewstate.top_users));
    const endp = term.length > 0 ? endpoint_allusers : endpoint_topusers;
    // Make the HTTP request:
    this.http.get<PaginatedResult<User>>(endp, {params: {query: queryjson}}).subscribe(data => {
      if (term == null || term.length == 0) {
      this.content.TopUsers = data;
      } else {
        this.content.AllUsers = data;
      }
      this.computeUsers();
    });
  }

}
