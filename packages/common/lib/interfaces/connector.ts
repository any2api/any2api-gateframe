import { Callable } from './callable';
import { InfoProvider } from './info-provider';

// tslint:disable-next-line:no-empty-interface
export interface Connector extends Callable, InfoProvider {
}
