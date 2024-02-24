export type JSON = {
  [key: string]: string | number | boolean | null | JSON | JSONArray;
};

type JSONArray = Array<string | number | boolean | null | JSON | JSONArray>;
