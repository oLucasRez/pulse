export namespace ModelCRUD {
  export type DTO = {
    id: string;
    createdAt: number;
    updatedAt: number;
  };
}

export * from './_dice';
export * from './_game';
export * from './_landmark';
export * from './_player';
export * from './_pulse';
export * from './_user';
