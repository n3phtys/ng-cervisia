import { Injectable } from '@angular/core';

// Import HttpClient from @angular/common/http
import { HttpClient } from '@angular/common/http';

import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { ReferenceAst } from '@angular/compiler';
import { Item, Freeby, Purchase, Bill, User, UserDetailInfo, ParametersAll, ParametersPurchaseLogGlobal, ServerWriteResult, RefreshedData, ParametersPagination, MakeFFAPurchase, CreateBudgetGiveout, CreateCountGiveout, CreateFreeForAll, EnrichedFFA, CreateBill, ParametersBillDetails, DetailedBill, EditBill, Finalized, DeleteUnfinishedBill, FinalizeBill, ExportBill, SetPriceForSpecial, EnrichedCountOrBudgetGiveout } from './backend-types';
import { AllUserSelectionPageSize, GlobalLogPageSize, FFAFreebyPageSize, IncomingFreebyPageSize, OutgoingFreebyPageSize } from './constants.layouts';
import { ToastsManager } from 'ng2-toastr';


export interface PaginatedResult<T> {
  total_count: number;
  from: number;
  to: number;
  results: T[];
}

export interface NamedArray {
  name: string;
  arr: Array<Item>;
}

export interface AllResults {
  DetailInfoForUser: PaginatedResult<UserDetailInfo>;
  TopUsers: PaginatedResult<User>;
  AllUsers: PaginatedResult<User>;
  AllItems: PaginatedResult<Item>;
  PurchaseLogGlobal: PaginatedResult<Purchase>;
  LastPurchases: PaginatedResult<Purchase>;
  BillsCount: PaginatedResult<Bill>;
  Bills: PaginatedResult<Bill>;
  BillDetails: PaginatedResult<DetailedBill>;
  OpenFFAFreebies: PaginatedResult<EnrichedFFA>;
  TopPersonalDrinks: PaginatedResult<Item>;
  PurchaseLogPersonal: PaginatedResult<Purchase>;
  IncomingFreebies: PaginatedResult<EnrichedCountOrBudgetGiveout>;
  OutgoingFreebies: PaginatedResult<EnrichedCountOrBudgetGiveout>;

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

export interface CreateUser {
  username: String;
}

export interface UpdateUser extends DeleteUser, CreateUser {
  external_user_id: string;
  is_billed: boolean;
  highlight_in_ui: boolean;
}

export interface DeleteUser {
  user_id: number;
}

export interface CreateItem {
  name: string;
  price_cents: number;
  category: string;
}

export interface UpdateItem extends DeleteItem, CreateItem { }

export interface DeleteItem {
  item_id: number;
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

const endpoint_topusers = 'api/users/top';
const endpoint_allusers = 'api/users/all';
const endpoint_topitems = 'api/items/top';
const endpoint_allitems = 'api/items/all';
const endpoint_personallog = 'api/purchases/personal';
const endpoint_globallog = 'api/purchases/global';
const endpoint_userdetails = 'api/users/detail';
const endpoint_bills = 'api/bills';
const endpoint_ffas = 'api/giveout/ffa';
const endpoint_incoming_freebies = 'api/giveout/incoming';
const endpoint_outgoing_freebies = 'api/giveout/outgoing';
const endpoint_detailed_bill = 'api/bills/detail';
const post_endpoint_simple_purchase = 'api/purchases';
const post_endpoint_cart_purchase = 'api/purchases/cart';
const post_endpoint_add_user = 'api/users';
const post_endpoint_update_user = 'api/users/update';
const post_endpoint_delete_user = 'api/users/delete';
const post_endpoint_add_item = 'api/items';
const post_endpoint_update_item = 'api/items/update';
const post_endpoint_delete_item = 'api/items/delete';
const post_endpoint_undo_purchase_user = 'api/purchases/undo/user';
const post_endpoint_undo_purchase_admin = 'api/purchases/undo/admin';
const post_endpoint_freeby_create_ffa = 'api/giveout/ffa';
const post_endpoint_freeby_create_count = 'api/giveout/count';
const post_endpoint_freeby_create_budget = 'api/giveout/budget';
const post_endpoint_ffa_purchase = 'api/purchases/ffa';
const post_endpoint_bill_create = 'api/bill/create';
const post_endpoint_bill_update = 'api/bill/update';
const post_endpoint_bill_delete = 'api/bill/delete';
const post_endpoint_bill_finalize = 'api/bill/finalize';
const post_endpoint_bill_export = 'api/bill/export';
const post_endpoint_set_special_price = 'api/purchases/special/setprice';

const post_endpoint_check_password = 'api/admin/checkpassword';


const MAX_NUMBER_OF_TOP_ITEMS_SHOWN = 4;
const MAX_NUMBER_OF_ALL_ITEMS_SHOWN = 40;

const NAME_OF_NO_CATEGORY = "Misc."

@Injectable()
export class BackendService {

  updatePersonalBills() {
    this.viewstate.bills.count_pars.scope_user_id = this.viewstate.personal_log.count_pars.user_id;
    this.updateBills();
  }
  updateIncomingFreebies() {

      const queryjson = (JSON.stringify(this.viewstate.incoming_freebies));
      const endp = endpoint_incoming_freebies;
      console.log(queryjson);
      this.http.get(endp, { params: { query: queryjson } }).subscribe(dat => {
        console.log(dat);
        const data = dat as PaginatedResult<EnrichedCountOrBudgetGiveout>;
        this.content.IncomingFreebies = data;
      });

  }
  updateOutgoingFreebies() {
    const queryjson = (JSON.stringify(this.viewstate.outgoing_freebies));
    const endp = endpoint_outgoing_freebies;
    console.log(queryjson);
    this.http.get(endp, { params: { query: queryjson } }).subscribe(dat => {
      console.log(dat);
      const data = dat as PaginatedResult<EnrichedCountOrBudgetGiveout>;
      this.content.OutgoingFreebies = data;
    });

  }


  checkPasswordAgainstServer(password: string): Observable<boolean> {
    return this.http.post<boolean>(post_endpoint_check_password, password);
  }

  viewstate: ParametersAll = {
    top_users: { n: AllUserSelectionPageSize },
    all_users: {
      count_pars: { searchterm: '' },
      pagination: {
        start_inclusive: 0,
        end_exclusive: AllUserSelectionPageSize,
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
        end_exclusive: GlobalLogPageSize,
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
        end_exclusive: GlobalLogPageSize,
      },
    },
    personal_detail_infos: {
      user_id: 0,
    },
    bills: {
      count_pars: {
        start_inclusive: 0,
        end_exclusive: new Date().getTime() + (1000 * 60 * 60 * 24 * 14),
        scope_user_id: null,
      },
      pagination: {
        start_inclusive: 0,
        end_exclusive: 5,
      }
    },
    bill_detail_infos: {
      timestamp_from: null,
      timestamp_to: null,
    },
    open_ffa_freebies: {
      pagination: {
        start_inclusive: 0,
        end_exclusive: FFAFreebyPageSize,
      }
    },
    incoming_freebies: {
      count_pars: {
        recipient_id: 0,
      },
      pagination: {
        start_inclusive: 0,
        end_exclusive: IncomingFreebyPageSize,
      }
    },
    outgoing_freebies: {
      count_pars: {
        donor_id: 0,
      },
      pagination: {
        start_inclusive: 0,
        end_exclusive: OutgoingFreebyPageSize,
      }
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
      to: AllUserSelectionPageSize,
      total_count: AllUserSelectionPageSize,
      results: [],
    },
    AllUsers: {
      from: 0,
      to: AllUserSelectionPageSize,
      total_count: AllUserSelectionPageSize,
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
    BillDetails: {
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

  constructor(private http: HttpClient, public toastr: ToastsManager) {
  }


  detailselect(user_id: number, username: string) {
    this.viewstate.personal_detail_infos.user_id = user_id;
    this.viewstate.personal_log.count_pars.user_id = user_id;
    this.viewstate.outgoing_freebies.count_pars.donor_id = user_id;
    this.viewstate.incoming_freebies.count_pars.recipient_id = user_id;
    this.refreshAllItems();
    this.refreshDetailInfo();
    this.detailUsername = username;
  }

  updateItemlist(searchterm: string) {
    this.viewstate.all_items.count_pars.searchterm = searchterm;
    this.refreshAllItems();
  }


  detailUsername: string = '';


  updateBills() {
    const queryjson = (JSON.stringify(this.viewstate.bills));
    const endp = endpoint_bills;
    console.log(queryjson);
    this.http.get<PaginatedResult<Bill>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.Bills = data;
    });
  }

  refreshLastPurchase() {
    const queriy: ParametersPurchaseLogGlobal = {
      count_pars: {
        millis_end: new Date().getTime() + 1000,
        millis_start: new Date().getTime() - (1000 * 60 * 60 * 24),
      },
      pagination: {
        start_inclusive: 0,
        end_exclusive: 5,
      },
    };
    const queryjson = (JSON.stringify(queriy));
    const endp = endpoint_globallog;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<Purchase>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.LastPurchases = data;
    });
  }

  refreshDetailedBill() {
    const queryjson = (JSON.stringify(this.viewstate.bill_detail_infos));
    const endp = endpoint_detailed_bill;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<DetailedBill>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.BillDetails = data;
    });
  }

  refreshAllItems() {
    const queryjson = (JSON.stringify(this.viewstate.all_items));
    const endp = endpoint_allitems;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
      console.log("refreshing all items");
    this.http.get(endp, { params: { query: queryjson } }).subscribe(dat => {
      console.log("received all items");
    
      const data = dat as PaginatedResult<Item>;

      this.content.AllItems = data;

      const v: Array<NamedArray> = [];

      for (let i = 0; i < data.results.length; i++) {
        const it: Item = data.results[i];
        let idx = v.findIndex(a => (a.name === it.category));
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
          if(it.category == null) {
            console.log("it.category == null");
            console.log(it);
            console.log(idx);
            console.log(v);
          }
          v.push({
            name: it.category,
            arr: [it]
          });
        }
      }


      v.forEach(na => {
        if (na.name == null) {
          na.name = NAME_OF_NO_CATEGORY;
        }
      });

      this.content.all_items_per_category = v;
    });
    console.log("Setup HTTP for refresh item");
  }

  refreshDetailInfo() {
    const queryjson = (JSON.stringify(this.viewstate.personal_detail_infos));
    const endp = endpoint_userdetails;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<UserDetailInfo>>(endp, { params: { query: queryjson } }).subscribe(data => {
      this.content.DetailInfoForUser = data;
      console.log("received detail info:");
      console.log(data);
    });
  }

  createBill(comment: string, billTimestampFrom: number, billTimestampTo: number) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_bill_create;
    const payload: CreateBill = {
      timestamp_from: billTimestampFrom,
      timestamp_to: billTimestampTo,
      comment: comment,
    };
    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }


  undoPurchaseByUser(purchase_id: number) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_undo_purchase_user;
    const payload = {
      unique_id: purchase_id,
    };
    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  undoPurchaseByAdmin(purchase_id: number) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_undo_purchase_admin;
    const payload = {
      unique_id: purchase_id,
    };
    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  createUser(username: string) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_add_user;
    const payload: CreateUser = {
      username: username,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  deleteUser(userId: number) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_delete_user;
    const payload: DeleteUser = {
      user_id: userId,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  updateUser(user: User) {
    
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_update_user;
    const payload: UpdateUser = {
      user_id: user.user_id,
      username: user.username,
      external_user_id: user.external_user_id.trim().length > 0 ? user.external_user_id : null,
      is_billed: user.is_billed,
      highlight_in_ui: user.highlight_in_ui,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }


  createItem(itemname: string, price_cents: number, category: string) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_add_item;
    const payload: CreateItem = {
      name: itemname,
      price_cents: price_cents,
      category: category,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );

  }

  deleteItem(itemId: number) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_delete_item;
    const payload: DeleteItem = {
      item_id: itemId,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  updateItem(item: Item) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_update_item;
    const payload: UpdateItem = {
      item_id: item.item_id,
      name: item.name,
      price_cents: item.cost_cents,
      category: item.category,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
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


  updatePersonalLog() {
    const queryjson = (JSON.stringify(this.viewstate.personal_log));
    const endp = endpoint_personallog;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get<PaginatedResult<Purchase>>(endp, { params: { query: queryjson } }).subscribe(data => {
      console.log("updating personal log");
      console.log(data);
      for (let x of data.results) {
        x['placeholder'] = 'my name';
      }
      this.content.PurchaseLogPersonal = data;
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

  static moveToPage(par: ParametersPagination, i: number, _pageSize: number) {
    if (_pageSize == null) {
      _pageSize = par.end_exclusive - par.start_inclusive;
    }
    par.start_inclusive = i * _pageSize;
    par.end_exclusive = (i + 1) * _pageSize;
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

  setAllUserPageSize(pageSize: number) {
    this.viewstate.all_users.pagination.start_inclusive = 0;
    this.viewstate.all_users.pagination.end_exclusive = pageSize;
  }

  updateMainUserlist(term: string): void {
    this.viewstate.all_users.count_pars.searchterm = term.trim();
    const queryjson = (JSON.stringify(term.length > 0 ? this.viewstate.all_users : this.viewstate.top_users));
    const endp = term.length > 0 ? endpoint_allusers : endpoint_topusers;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get(endp, { params: { query: queryjson } }).subscribe(dat => {
      console.log(dat);
      const data = dat as PaginatedResult<User>;
      if (term == null || term.trim().length == 0) {
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



  purchaseList(username: string, userId: number, purchases: Array<ShoppingCartElement>) {
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
        purchases.forEach(ele => this.toastr.success("von " + username, "Abgestrichen: " + ele.count + " * " + ele.item.name), this.TOAST_CONFIG);
      } else {
      this.toastr.error("Fehler: " + data.error_message, "Abstreichen misslungen", this.TOAST_CONFIG);
      }
    }, err => {
      console.log("error in makeSimplePurchase: " + err);
      this.toastr.error("Fehler: " + err, "Abstreichen misslungen" , this.TOAST_CONFIG);
    }
    );
  }

  updateContentWithWriteResult(result: RefreshedData) {
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

  
  TOAST_CONFIG = {
    toastLife: 5000,
    dismiss: 'auto',
    animate: 'flyRight',
    showCloseButton: true,
    positionClass: 'toast-bottom-right',
    newestOnTop: true,
    maxShown: 8,
  };

  makeSimplePurchase(itemname: string, username: string, itemId: number, userId: number) {
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
        this.toastr.success("von " + username, "Abgestrichen: " + itemname, this.TOAST_CONFIG);
      } else {
      this.toastr.error("Fehler: " + data.error_message, "Abstreichen misslungen", this.TOAST_CONFIG );
      }
    }, err => {
      console.log("error in makeSimplePurchase: " + err);
      this.toastr.error("Fehler: " + err, "Abstreichen misslungen", this.TOAST_CONFIG );
    }
    );
  }

  createBudgetFreeby(doner_id: number, recipient_id: number, amountCents: number, message: string) : Observable<void> {

    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_freeby_create_budget;
    const payload: CreateBudgetGiveout = {
      cents_worth_total: amountCents,
      text_message: message,
      donor: doner_id,
      recipient: recipient_id,
    };

    return this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).map(data => {
      console.log("Success of create budget");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  createCountFreeby(doner_id: number, recipient_id: number, allowedItems: Array<number>, selectedCategories: Array<string>, amountUnits: number, message: string) : Observable<void> {
    console.log("Beginning createCountFreeby");
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_freeby_create_count;



    const payload: CreateCountGiveout = {
      allowed_categories: selectedCategories,
      allowed_drinks: allowedItems,
      allowed_number_total: amountUnits,
      text_message: message,
      donor: doner_id,
      recipient: recipient_id,
    };
    console.log(queryjson);
    console.log(endp);
    console.log(payload);

    return this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).map(data => {
      console.log("Success of create count");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  createFFAFreeby(doner_id: number, allowedItems: Array<number>, selectedCategories: Array<string>, amountUnits: number, message: string) : Observable<void> {
    console.log("selectedCategories");
    console.log(selectedCategories);
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_freeby_create_ffa;


    const payload: CreateFreeForAll = {
      allowed_categories: selectedCategories,
      allowed_drinks: allowedItems,
      allowed_number_total: amountUnits,
      text_message: message,
      donor: doner_id,
    };

    console.log("json: ")
    console.log(payload);
    console.log(JSON.stringify(payload));

    return this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).map(data => {
      console.log("Success of create ffa");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }


  makeFFAPurchase(donorname: string, itemname: string, ffaId: number, itemId: number) {
    
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_ffa_purchase;
    const payload: MakeFFAPurchase = {
      ffa_id: ffaId,
      item_id: itemId,
    };

    this.http.post<ServerWriteResult>(endp, JSON.stringify(payload), { params: { query: queryjson } }).subscribe(data => {
      console.log("Success of post ffa purchase");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
        this.toastr.success("Ausgegeben von " + donorname, "FFA abgestrichen: " + itemname, this.TOAST_CONFIG);
      } else {
      this.toastr.error("Fehler: " + data.error_message, "FFA Abstreichen misslungen", this.TOAST_CONFIG );
      }
    }, err => {
      console.log("error in makeFFAPurchase");
      this.toastr.error("Fehler: " + err, "FFA Abstreichen misslungen", this.TOAST_CONFIG );
    }
    );
  }

  updateOpenFFAs() {
    const queryjson = (JSON.stringify(this.viewstate.open_ffa_freebies));
    const endp = endpoint_ffas;
    console.log(queryjson);
    // Make the HTTP request: <PaginatedResult<User>>
    this.http.get(endp, { params: { query: queryjson } }).subscribe(dat => {
      console.log(dat);
      const data = dat as PaginatedResult<EnrichedFFA>;
      this.content.OpenFFAFreebies = data;
    });
  }

  editBill(editBill: EditBill) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_bill_update;
    this.http.post<ServerWriteResult>(endp, JSON.stringify(editBill), { params: { query: queryjson } }).subscribe(data => {
      console.log("Success of post editBill");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  finalizeBill(finalizeBill: FinalizeBill) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_bill_finalize;
    this.http.post<ServerWriteResult>(endp, JSON.stringify(finalizeBill), { params: { query: queryjson } }).subscribe(data => {
      console.log("Success of post finalizeBill");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  deleteBill(deleteBill: DeleteUnfinishedBill) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_bill_delete;
    this.http.post<ServerWriteResult>(endp, JSON.stringify(deleteBill), { params: { query: queryjson } }).subscribe(data => {
      console.log("Success of post deleteBill");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }
  exportBillToEmail(exportBill: ExportBill) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_bill_export;
    this.http.post<ServerWriteResult>(endp, JSON.stringify(exportBill), { params: { query: queryjson } }).subscribe(data => {
      console.log("Success of post exportBill");
      console.log(data);
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }

  setPriceForSpecial(setPriceForSpecial: SetPriceForSpecial) {
    const queryjson = (JSON.stringify(this.viewstate));
    const endp = post_endpoint_set_special_price;
    this.http.post<ServerWriteResult>(endp, JSON.stringify(setPriceForSpecial), { params: { query: queryjson } }).subscribe(data => {
      console.log("Success of post setPriceForSpecial: ");
      console.log(setPriceForSpecial);
      console.log(data);
      console.log("That was set price post result");
      if (data.is_success) {
        this.updateContentWithWriteResult(data.content.refreshed_data);
      }
    }
    );
  }
}
