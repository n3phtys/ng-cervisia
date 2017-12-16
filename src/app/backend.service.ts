import { Injectable } from '@angular/core';

// Import HttpClient from @angular/common/http
import { HttpClient } from '@angular/common/http';

import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { ReferenceAst } from '@angular/compiler';


export interface PaginatedResult<T> {
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
  SimplePurchase: SimplePurchase;
}

export interface SimplePurchase {
  unique_id: number;
  timestamp_epoch_millis: number;
  item: Item;
  consumer: User;
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
  bills: ParametersBills;
  open_ffa_freebies: ParametersOpenFFAFreebies;
  incoming_freebies: ParametersIncomingFreebies;
  outgoing_freebies: ParametersOutgoingFreebies;
}

interface ParametersBills {
  count_pars: ParametersBillsCount;
  pagination: ParametersPagination;
}

interface ParametersOpenFFAFreebies {

}

interface ParametersIncomingFreebies {

}

interface ParametersOutgoingFreebies {

}

interface ParametersBillsCount {

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

export interface TimespanWithUserId extends Timespan {
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

export interface NamedArray {
  name: string;
  arr: Array<Item>;
}

export interface AllResults {
  DetailInfoForUser: PaginatedResult<DetailInfo>;
  TopUsers: PaginatedResult<User>;
  AllUsers: PaginatedResult<User>;
  AllItems: PaginatedResult<Item>;
  PurchaseLogGlobal: PaginatedResult<Purchase>;
  LastPurchases: PaginatedResult<Purchase>;
  BillsCount: PaginatedResult<Bill>;
  Bills: PaginatedResult<Bill>;
  OpenFFAFreebies: PaginatedResult<Freeby>;
  TopPersonalDrinks: PaginatedResult<Item>;
  PurchaseLogPersonal: PaginatedResult<Purchase>;
  IncomingFreebies: PaginatedResult<Freeby>;
  OutgoingFreebies: PaginatedResult<Freeby>;

  top_items_cache: Map<number, Item[]>;
  autocomplete_collection: string[];

  computed_users_in_list: User[];
  selected_users_top_items: Item[];
  all_items_per_category: Array<NamedArray>;
}

export interface KeyValue {
  key: number;
  value: number;
}

export interface MakeSimplePurchase {
  user_id: number;
  item_id: number;
}

export interface MakeCartPurchase {
  user_id: number;
  items: KeyValue[];
  specials: string[];
}


export interface MakeSpecialPurchase {
  user_id: number;
  item_name: string;
}


export interface ShoppingCartElement {
  item: Item;
  count: number;
}

const endpoint_topusers = '/api/users/top';
const endpoint_allusers = '/api/users/all';
const endpoint_topitems = '/api/items/top';
const endpoint_allitems = '/api/items/all';
const endpoint_personallog = '/api/purchases/personal';
const endpoint_globallog = '/api/purchases/global';
const endpoint_userdetails = '/api/users/detail';
const post_endpoint_simple_purchase = '/api/purchases';
const post_endpoint_cart_purchase = '/api/purchases/cart';

const MAX_NUMBER_OF_USERS_SHOWN = 40;
const MAX_NUMBER_OF_TOP_ITEMS_SHOWN = 4;
const MAX_NUMBER_OF_ALL_ITEMS_SHOWN = 40;

const NAME_OF_NO_CATEGORY = "Misc."

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
    global_log: {
      count_pars: {
        millis_start: 0 - (1000 * 60 * 60 * 24 * 14),
        millis_end: new Date().getTime() + (1000 * 60 * 60 * 24 * 14),
      },
      pagination: {
        start_inclusive: 0,
        end_exclusive: 10,
      },
    },
    top_personal_drinks: {
      user_id: 0,
      n: MAX_NUMBER_OF_TOP_ITEMS_SHOWN,
    },
    personal_log: {
      count_pars: {
        user_id: 0,
        millis_start: new Date().getTime() - (1000 * 60 * 60 * 24 * 14),
        millis_end: new Date().getTime() + (1000 * 60 * 60 * 24 * 14),
      },
      pagination: {
        start_inclusive: 0,
        end_exclusive: 10,
      },
    },
    personal_detail_infos: {
      user_id: 0,
    },
    bills: {
      count_pars: {},
      pagination: {
        start_inclusive: 0,
        end_exclusive: 5,
      }
    },
    open_ffa_freebies: {},
    incoming_freebies: {},
    outgoing_freebies: {},
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
    PurchaseLogGlobal: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    LastPurchases: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    BillsCount: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    Bills: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    OpenFFAFreebies: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    TopPersonalDrinks: {
      from: 0,
      to: MAX_NUMBER_OF_TOP_ITEMS_SHOWN,
      total_count: MAX_NUMBER_OF_TOP_ITEMS_SHOWN,
      results: [],
    },
    PurchaseLogPersonal: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    IncomingFreebies: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    OutgoingFreebies: {
      from: 0,
      to: 0,
      total_count: 0,
      results: [],
    },
    computed_users_in_list: [],
    top_items_cache: new Map(),
    autocomplete_collection: [],
    selected_users_top_items: [],
    all_items_per_category: [],
  };

  constructor(private http: HttpClient) {
  }


  detailselect(user: number) {
    this.viewstate.personal_detail_infos.user_id = user;
    this.refreshAllItems();
    this.refreshDetailInfo();
  }

  updateItemlist(searchterm: string) {
    this.viewstate.all_items.count_pars.searchterm = searchterm;
    this.refreshAllItems();
  }

  refreshLastPurchase() {
    const queriy: ParametersPurchaseLogGlobal = {
      count_pars: {
        millis_start: new Date().getTime() + 1000,
        millis_end: new Date().getTime() - (1000 * 60 * 60 * 24),
      },
      pagination: {
        start_inclusive: 0,
        end_exclusive: 5,
      },
    };
    const queryjson = (JSON.stringify(queriy));
    const endp = endpoint_allitems;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<Purchase>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.LastPurchases = data;
    });
  }

  refreshAllItems() {
    const queryjson = (JSON.stringify(this.viewstate.all_items));
    const endp = endpoint_allitems;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<Item>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.AllItems = data;

      const v: Array<NamedArray> = [];

      for (let i = 0; i < data.results.length; i++) {
        const it: Item = data.results[i];
        let idx = v.findIndex(a => (it.category != null && a.name === it.category) || (it.category == null && NAME_OF_NO_CATEGORY === it.category));
        if (idx >= 0) {
          //add to existing list
          v[idx].arr.push(it);
        } else {
          //append
          if (it.category != null && it.category.length > 0) {
            if (-1 === this.content.autocomplete_collection.findIndex(i => i == it.category)) {
              this.content.autocomplete_collection.push(it.category);
            }
          }

          v.push({
            name: it.category != null ? it.category : NAME_OF_NO_CATEGORY,
            arr: [it]
          });
        }
      }

      this.content.all_items_per_category = v;
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


  createUser(username: string) {
    //TODO: implement
    throw new Error('Not yet implemented');
  }

  deleteUser(userId: number) {
    //TODO: implement
    throw new Error('Not yet implemented');
  }

  updateUser(user: User) {
    //TODO: implement
    throw new Error('Not yet implemented');
  }


  createItem(itemname: string, cost_cents: number, category: string) {
    //TODO: implement
    throw new Error('Not yet implemented');
  }

  deleteItem(itemId: number) {
    //TODO: implement
    throw new Error('Not yet implemented');
  }

  updateItem(item: Item) {
    //TODO: implement
    throw new Error('Not yet implemented');
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


  updateGlobalLog() {
    const queryjson = (JSON.stringify(this.viewstate.global_log));
    const endp = endpoint_globallog;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<Purchase>>(endp, { params: { query: queryjson } }).subscribe(data => {
      console.log("updating global log");
      console.log(data);
      for (let x of data.results) {
        x['placeholder'] = 'my name';
      }
      this.content.PurchaseLogGlobal = data;
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

  static moveToPage(par: ParametersPagination, i: number) {
    const pageSize = par.end_exclusive - par.start_inclusive;
    par.start_inclusive = i * pageSize;
    par.end_exclusive = (i + 1) * pageSize;
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

  updateMainUserlist(term: string): void {
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


  updateAllUserlist(term: string): void {
    this.viewstate.all_users.count_pars.searchterm = term;
    const queryjson = (JSON.stringify(this.viewstate.all_users));
    const endp = endpoint_allusers;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get(endp, { params: { query: queryjson } }).subscribe(dat => {
      console.log(dat);
      const data = dat as PaginatedResult<User>;
      this.content.AllUsers = data;
    });
  }



  purchaseList(userId: number, purchases: Array<ShoppingCartElement>) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_cart_purchase;

    const specialNames: string[] = purchases.filter(i => i.item.item_id < 0).map(i => i.item.name);

    console.log("specialnames =");
    console.log(specialNames);
    const items: KeyValue[] = purchases.filter(i => i.item.item_id >= 0).map(i => <KeyValue>{ key: i.item.item_id, value: i.count });

    console.log("items = ");
    console.log(items);

    const payload: MakeCartPurchase = {
      user_id: userId,
      specials: specialNames,
      items: items,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      console.log("Success of post simple purchase");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  updateContentWithWriteResult(result: AllResults) {
    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        const v = result[key];
        if (v !== null) {
          this.content[key] = v;
        } else {
          console.log('' + key + " was null")
        }
      }
    }

  }

  makeSimplePurchase(itemId: number, userId: number) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_simple_purchase;
    const payload: MakeSimplePurchase = {
      user_id: userId,
      item_id: itemId,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      console.log("Success of post simple purchase");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

}
