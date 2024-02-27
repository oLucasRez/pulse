export interface Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export namespace Model {
  export type JSON = {
    id: string;
    createdAt: number;
    updatedAt: number;
  };
}

export * from './_answer';
export * from './_dice';
export * from './_game';
export * from './_landmark';
export * from './_player';
export * from './_pulse';
export * from './_round';
export * from './_user';
