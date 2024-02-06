import { DomainError } from '@domain/errors';

export const logError = (e: DomainError): any => console.error(e.message);

export const alertError = (e: DomainError): any => alert(e.message);
