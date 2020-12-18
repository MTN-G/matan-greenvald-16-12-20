export interface Item {
  id: number;
  name: string;
  price: number;
  estimatedDate: string | number;
  store: number | string;
  recieved: boolean;
  labels: number[] | string[];
}

export interface Store {
  id: number;
  name: string;
  link: string;
  count?: number;
}

export interface Label {
  id: number;
  name: string;
}

export interface ListPageProps {
  getItems: Function;
  getLabels: Function;
  getStores: Function;
  currency: number;
}
