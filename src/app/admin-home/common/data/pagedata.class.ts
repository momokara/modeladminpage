export class SearchInfo {
    key: string;
    value: string;
    constructor(defaultkey: string) {
        this.key = defaultkey;
    }
}
export class SortInfo {
    key: string;
    value: string;
    constructor() {
        this.key = null;
        this.value = null;
    }
}
export class ListData {
    dataset: Rowdata[];
    datares: Rowdata[];
    issearch: boolean;
    constructor(issearch: boolean, defaultpageindex: number, defaultpagesize: number) {
        this.issearch = issearch;
        this.dataset = [];
        this.datares = [];
    }
}

class Rowdata {
    id: number;
    uid: number;
    pid: number;
    nickname: string;
    group_name: string;
    name: string;
    phone: number;
    email: string;
    station: number;
}
