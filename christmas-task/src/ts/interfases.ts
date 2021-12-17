export interface IData {
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
  type?: string | null;
};

export type SliderValues = {
  year: number[];
  count: number[];
};
