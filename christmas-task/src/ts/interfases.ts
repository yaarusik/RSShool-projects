export interface ChristmasToy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export type SortProperty = {
  name?: string | null | string[];
  type?: string;
};

export type SliderValues = {
  [key: string]: number[];
};

export type CommonSort = {
  [key: string]: string[];
};
