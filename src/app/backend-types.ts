export interface ParametersAll {
    top_users: ParametersTopUsers;
    all_users: ParametersAllUsers;
    all_items: ParametersAllItems;
    global_log: ParametersPurchaseLogGlobal;
    bills: ParametersBills;
    bill_detail_infos: ParametersBillDetails;
    open_ffa_freebies: ParametersOpenFFAFreebies;
    top_personal_drinks: ParametersTopPersonalDrinks;
    personal_log: ParametersPurchaseLogPersonal;
    incoming_freebies: ParametersIncomingFreebies;
    outgoing_freebies: ParametersOutgoingFreebies;
    personal_detail_infos: ParametersDetailInfoForUser;
}


export interface ParametersPagination {
    start_inclusive: number;
    end_exclusive: number;
}


export interface ParametersTopUsers {
    n: number;
}


export interface ParametersAllUsersCount {
    searchterm: string;
}


export interface ParametersAllUsers {
    count_pars: ParametersAllUsersCount;
    pagination: ParametersPagination;
}


export interface ParametersAllItemsCount {
    searchterm: string;
}


export interface ParametersAllItems {
    count_pars: ParametersAllItemsCount;
    pagination: ParametersPagination;
}


export interface ParametersPurchaseLogGlobalCount {
    millis_start: number;
    millis_end: number;
}


export interface ParametersPurchaseLogGlobal {
    count_pars: ParametersPurchaseLogGlobalCount;
    pagination: ParametersPagination;
}


export interface ParametersBillsCount {
    start_inclusive: number;
    end_exclusive: number;
    scope_user_id: number;
}


export interface ParametersBills {
    count_pars: ParametersBillsCount;
    pagination: ParametersPagination;
}


export interface ParametersBillDetails {
    timestamp_from: number;
    timestamp_to: number;
}


export interface ParametersOpenFFAFreebies {
    pagination: ParametersPagination;
}


export interface ParametersTopPersonalDrinks {
    user_id: number;
    n: number;
}


export interface ParametersPurchaseLogPersonalCount {
    user_id: number;
    millis_start: number;
    millis_end: number;
}


export interface ParametersPurchaseLogPersonal {
    count_pars: ParametersPurchaseLogPersonalCount;
    pagination: ParametersPagination;
}


export interface ParametersIncomingFreebiesCount {
    recipient_id: number;
}


export interface ParametersIncomingFreebies {
    count_pars: ParametersIncomingFreebiesCount;
    pagination: ParametersPagination;
}


export interface ParametersOutgoingFreebiesCount {
    donor_id: number;
}


export interface ParametersOutgoingFreebies {
    count_pars: ParametersOutgoingFreebiesCount;
    pagination: ParametersPagination;
}


export interface ParametersDetailInfoForUser {
    user_id: number;
}


export interface EnrichedFFA {
    id: number;
    items: Array<Item>;
    total: number;
    left: number;
    text_message: string;
    created_timestamp: number;
    donor: User;
}

export interface EnrichedCountOrBudgetGiveout {
    id: number;
    items: Array<Item>;
    cents_worth_total: number;
    cents_worth_used: number;
    total: number;
    left: number;
    text_message: string;
    created_timestamp: number;
    donor: User;
    recipient: User,
}


export interface UserDetailInfo {
    consumed: Map<string, number>;
    last_bill_date: number;
    last_bill_cost: number;
    currently_cost: number;
}


export interface DetailedBill {
    timestamp_from: number;
    timestamp_to: number;
    bill_state: BillState;
    comment: string;
    users: UserGroup;
    ready_for_finalization: boolean;
    all_specials: Array<Purchase>;
    unset_specials_indices: Array<number>;
    touched_users: Array<User>;
    users_excluded_externally_indices: Array<number>;
    users_undefined_indices: Array<number>;
    users_excluded_internally_indices: Array<number>;
    users_excludable_but_not_internally_indices: Array<number>;
}


export interface FFAPurchase {
    unique_id: number;
    timestamp_epoch_millis: number;
    item: Item;
    freeby: Freeby;
    donor: User;
}

export interface SpecialPurchase {
    unique_id: number;
    timestamp_epoch_millis: number;
    special_name: string;
    specialcost: number;
    consumer: User;
}

export interface SimplePurchase {
    unique_id: number;
    timestamp_epoch_millis: number;
    item: Item;
    consumer: User;
}

export interface Purchase {
    FFAPurchase: FFAPurchase;
    SpecialPurchase: SpecialPurchase;
    SimplePurchase: SimplePurchase;
}




export interface CreateBill {
    timestamp_from: number;
    timestamp_to: number;
    comment: string;
}


export interface EditBill {
    timestamp_from: number;
    timestamp_to: number;
    comment: string;
    exclude_user_ids: Array<number>;
}


export interface FinalizeBill {
    timestamp_from: number;
    timestamp_to: number;
}


export interface ExportBill {
    timestamp_from: number;
    timestamp_to: number;
    limit_to_user: number;
    email_address: string;
}


export interface DeleteUnfinishedBill {
    timestamp_from: number;
    timestamp_to: number;
}


export interface DeleteUnfinishedBill {
    timestamp_from: number;
    timestamp_to: number;
}


export interface User {
    username: string;
    external_user_id: string;
    user_id: number;
    is_billed: boolean;
    highlight_in_ui: boolean;
    deleted: boolean;
}


export interface SingleUser {
    user_id: number;
}

export interface AllUsers {
}

export interface MultipleUsers {
    user_ids: Array<number>;
}

export interface UserGroup {
    SingleUser: SingleUser;
    AllUsers: AllUsers;
    MultipleUsers: MultipleUsers;
}




export interface Item {
    name: string;
    item_id: number;
    category: string;
    cost_cents: number;
    deleted: boolean;
}


export interface Created {
}

export interface Finalized {
}

export interface ExportedAtLeastOnce {
}

export interface BillState {
    Created: Created;
    Finalized: Finalized;
    ExportedAtLeastOnce: ExportedAtLeastOnce;
}




export interface BillUserInstance {
    user_id: number;
    per_day: Map<number, BillUserDayInstance>;
}


export interface BillUserDayInstance {
    personally_consumed: Map<number, number>;
    specials_consumed: Array<PricedSpecial>;
    ffa_giveouts: Map<number, number>;
    giveouts_to_user_id: Map<number, PaidFor>;
}


export interface ExportableBillData {
    all_users: Map<number, User>;
    all_items: Map<number, Item>;
    user_consumption: Map<number, BillUserInstance>;
}


export interface PricedSpecial {
    purchase_id: number;
    price: number;
    name: string;
}


export interface PaidFor {
    recipient_id: number;
    count_giveouts_used: Map<number, number>;
    budget_given: number;
    budget_gotten: number;
}


export interface Bill {
    timestamp_from: number;
    timestamp_to: number;
    comment: string;
    users: UserGroup;
    bill_state: BillState;
    users_that_will_not_be_billed: Array<number>;
    finalized_data: ExportableBillData;
}


export interface FFA {
    id: number;
    allowed_categories: Array<string>;
    allowed_drinks: Array<number>;
    allowed_number_total: number;
    allowed_number_used: number;
    text_message: string;
    created_timestamp: number;
    donor: number;
}

export interface Transfer {
    id: number;
    cents_worth_total: number;
    cents_worth_used: number;
    text_message: string;
    created_timestamp: number;
    donor: number;
    recipient: number;
}

export interface Classic {
    id: number;
    allowed_categories: Array<string>;
    allowed_drinks: Array<number>;
    allowed_number_total: number;
    allowed_number_used: number;
    text_message: string;
    created_timestamp: number;
    donor: number;
    recipient: number;
}

export interface Freeby {
    FFA: FFA;
    Transfer: Transfer;
    Classic: Classic;
}




export interface ServerWriteResult {
    error_message: string;
    is_success: boolean;
    content: SuccessContent;
}


export interface SuccessContent {
    timestamp_epoch_millis: number;
    refreshed_data: RefreshedData;
}


export interface RefreshedData {
    DetailInfoForUser: any;
    TopUsers: any;
    AllUsers: any;
    AllItems: any;
    PurchaseLogGlobal: any;
    LastPurchases: any;
    BillsCount: any;
    Bills: any;
    BillDetails: any;
    OpenFFAFreebies: any;
    TopPersonalDrinks: any;
    PurchaseLogPersonal: any;
    IncomingFreebies: any;
    OutgoingFreebies: any;
}


export interface MakeSimplePurchase {
    user_id: number;
    item_id: number;
}


export interface MakeCartPurchase {
    user_id: number;
    items: Array<KeyValue>;
    specials: Array<string>;
}


export interface MakeFFAPurchase {
    ffa_id: number;
    item_id: number;
}


export interface CreateFreeForAll {
    allowed_categories:  Array<string>;
    allowed_drinks: Array<number>;
    allowed_number_total: number;
    text_message: string;
    donor: number;
}


export interface CreateBudgetGiveout {
    cents_worth_total: number;
    text_message: string;
    donor: number;
    recipient: number;
}


export interface CreateCountGiveout {
    allowed_categories: Array<string>;
    allowed_drinks: Array<number>;
    allowed_number_total: number;
    text_message: string;
    donor: number;
    recipient: number;
}


export interface SetPriceForSpecial {
    unique_id: number;
    price: number;
}


export interface KeyValue {
    key: number;
    value: number;
}

