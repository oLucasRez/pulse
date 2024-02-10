import { LoaderFunctionArgs } from 'react-router-dom';

export * from './_game';
export * from './_home';

export type Loader = (args: LoaderFunctionArgs) => Promise<any>;
