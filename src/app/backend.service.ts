import { Injectable } from '@angular/core';

// Import HttpClient from @angular/common/http
import { HttpClient } from '@angular/common/http';

import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { ReferenceAst } from '@angular/compiler';


interface PaginatedResult<T> {
  total_count: number;
  from: number;
  to: number;
  results: T[];
}

export interface Item {
  name: string;
  item_id: number;
  category: string;
  cost_cents: number;
}

export interface User {
  username: string;
  user_id: number;
  is_billed: boolean;
}

export interface Purchase {
  unique_id: number;
  timestamp_epoch_millis: number;
  item_id: number;
  consumer_id: number;
}

export interface DetailInfo {
  consumed: Map<string, number>;
  last_bill_date: number;
  last_bill_cost: number;
  currently_cost: number;
}

export interface AppState {
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

export interface Timespan {
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

export interface ParametersDetailInfoForUser {
  user_id: number;
}

export interface SuccessContent {
  timestamp_epoch_millis: number;
  refreshed_data: AllResults;
}

export interface ServerWriteResult {
  error_message: string;
  is_success: boolean;
  content: SuccessContent;
}

export interface Bill {

}

export interface Freeby {

}

export interface AllResults {
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

  top_items_cache: Map<number, Item[]>;

  computed_users_in_list: User[];
  selected_users_top_items: Item[];
}



const endpoint_topusers = '/api/users/top';
const endpoint_allusers = '/api/users/all';
const endpoint_topitems = '/api/items/top';
const endpoint_allitems = '/api/items/all';
const endpoint_personallog = '/api/purchases/personal';
const endpoint_globallog = '/api/purchases/global';
const endpoint_userdetails = '/api/users/detail';
const post_endpoint_simple_purchase = '/api/purchases';

const MAX_NUMBER_OF_USERS_SHOWN = 40;
const MAX_NUMBER_OF_TOP_ITEMS_SHOWN = 4;
const MAX_NUMBER_OF_ALL_ITEMS_SHOWN = 40;

@Injectable()
export class BackendService {

  viewstate: AppState = {
    top_users: { n: MAX_NUMBER_OF_USERS_SHOWN },
    all_users: {
      count_pars: { searchterm: '' },
      pagination: {
        start_inclusive: 0,
        end_exclusive: MAX_NUMBER_OF_USERS_SHOWN,
      }
    },
    all_items: {
      count_pars: {
        searchterm: '',
      },
      pagination: {
        start_inclusive: 0,
        end_exclusive: MAX_NUMBER_OF_ALL_ITEMS_SHOWN,
      }
    },
    global_log: null,
    top_personal_drinks: {
      user_id: 0,
      n: MAX_NUMBER_OF_TOP_ITEMS_SHOWN,
    },
    personal_log: null,
    personal_detail_infos: {
      user_id: 0,
    },
  };

  content: AllResults = {
    DetailInfoForUser: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    TopUsers: {
      from: 0,
      to: MAX_NUMBER_OF_USERS_SHOWN,
      total_count: MAX_NUMBER_OF_USERS_SHOWN,
      results: [],
    },
    AllUsers: {
      from: 0,
      to: MAX_NUMBER_OF_USERS_SHOWN,
      total_count: MAX_NUMBER_OF_USERS_SHOWN,
      results: [],
    },
    AllItems: {
      from: 0,
      to: MAX_NUMBER_OF_ALL_ITEMS_SHOWN,
      total_count: MAX_NUMBER_OF_ALL_ITEMS_SHOWN,
      results: [],
    },
    PurchaseLogGlobal: null,
    BillsCount: null,
    Bills: null,
    OpenFFAFreebies: null,
    TopPersonalDrinks: {
      from: 0,
      to: MAX_NUMBER_OF_TOP_ITEMS_SHOWN,
      total_count: MAX_NUMBER_OF_TOP_ITEMS_SHOWN,
      results: [],
    },
    PurchaseLogPersonal: null,
    IncomingFreebies: null,
    OutgoingFreebies: null,
    computed_users_in_list: [],
    top_items_cache: new Map(),
    selected_users_top_items: [],
  };

  constructor(private http: HttpClient) { }


  detailselect(user: number) {
    this.viewstate.personal_detail_infos.user_id = user;
    this.refreshAllItems();
    this.refreshDetailInfo();
  }

  updateItemlist(searchterm: string) {
    this.viewstate.all_items.count_pars.searchterm = searchterm;
    this.refreshAllItems();
  }

  refreshAllItems() {
    const queryjson = (JSON.stringify(this.viewstate.all_items));
    const endp = endpoint_allitems;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<Item>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.AllItems = data;
    });
  }

  refreshDetailInfo() {
    const queryjson = (JSON.stringify(this.viewstate.personal_detail_infos));
    const endp = endpoint_userdetails;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<DetailInfo>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.DetailInfoForUser = data;
    });
  }

  quickselect(user: User) {
    // update appstate
    this.viewstate.top_personal_drinks.user_id = user.user_id;

    // first select from existing entries
    this.select_top_items_from_cache();

    // add http call for future ref
    this.updateTopItemsForCurrentlySelected();
  }

  private select_top_items_from_cache() {
    console.log("Selecting Top Items for id = " + this.viewstate.top_personal_drinks.user_id);
    console.log(this.content);
    this.content.selected_users_top_items = this.content.top_items_cache.get(this.viewstate.top_personal_drinks.user_id);
    console.log(this.content.selected_users_top_items);
  }

  private updateTopItemsForCurrentlySelected() {
    const userId = this.viewstate.top_personal_drinks.user_id;
    const queryjson = (JSON.stringify(this.viewstate.top_personal_drinks));
    const endp = endpoint_topitems;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<Item>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.top_items_cache.set(userId, data.results);
      this.select_top_items_from_cache();
    });
  }


  callhttp(): void {

    const queryjson = encodeURIComponent(JSON.stringify(this.viewstate.top_users));
    // Make the HTTP request:
    this.http.get<PaginatedResult<User>>(endpoint_topusers, { params: { query: queryjson } }).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
    });
  }

  computeUsers(): void {
    console.log(this.content);
    console.log(this.viewstate);
    if (this.viewstate.all_users.count_pars.searchterm.length > 0) {
      this.content.computed_users_in_list = this.content.AllUsers.results;
    } else {
      this.content.computed_users_in_list = this.content.TopUsers.results;
    }
    console.log(this.content);
  }

  updateUserlist(term: string): void {
    this.viewstate.all_users.count_pars.searchterm = term;
    const queryjson = (JSON.stringify(term.length > 0 ? this.viewstate.all_users : this.viewstate.top_users));
    const endp = term.length > 0 ? endpoint_allusers : endpoint_topusers;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get(endp, { params: { query: queryjson } }).subscribe(dat => {
      console.log(dat);
      const data = dat as PaginatedResult<User>;
      if (term == null || term.length === 0) {
        this.content.TopUsers = data;
      } else {
        this.content.AllUsers = data;
      }
      this.computeUsers();
    });
  }

}
