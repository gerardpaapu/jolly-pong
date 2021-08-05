/* eslint-disable @typescript-eslint/no-empty-interface */
export interface UriToKind<A> {}
export type URIs = keyof UriToKind<any>;
export type TApp<Uri extends URIs, T> = UriToKind<T>[Uri];
