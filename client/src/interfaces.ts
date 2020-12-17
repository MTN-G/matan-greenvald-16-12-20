export interface Item {
  id: number;
  name: string;
  price: number;
  estimatedDate: string;
  store: number | string;
  recieved: boolean;
  labels: number[] | string[];
}

export interface Store {
  id: number;
  name: string;
  link: string;
}

export interface Label {
  id: number;
  name: string;
}
