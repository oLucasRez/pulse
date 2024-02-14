import { LoaderFunctionArgs } from 'react-router-dom';

export * from './_game';
export * from './_home';
export * from './_register';

export type Loader = (args: LoaderFunctionArgs) => Promise<any>;
