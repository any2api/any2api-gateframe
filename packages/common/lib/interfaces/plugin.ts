import * as ProtoBuf from 'protobufjs';
import { Connector } from './connector';
import { Intermediary } from './intermediary';
import { Adapter } from './adapter';
import { Callable } from './callable';

/**
 * Interface for all plugin types.
 */
export interface Plugin {
    /**
     * Plugins can provide types of their configuration.
     * The types then do not need to be retrieved from type url
     */
    configurationTypes?: ProtoBuf.Root;
}

export interface InitResult {
    info?: any;
}

export interface ConnectorInitResult extends InitResult {
    instance: Connector;
    serviceDefinition: ProtoBuf.Namespace;
}

export interface ConnectorPlugin extends Plugin {
    init(config: any): Promise<ConnectorInitResult> | ConnectorInitResult;
}

export interface IntermediaryInitResult extends InitResult {
    instance: Intermediary;
    updatedServiceDefinition?: ProtoBuf.Namespace;
}

export interface IntermediaryPlugin extends Plugin {
    init(serviceDefinition: ProtoBuf.Namespace, config?: any):
        Promise<IntermediaryInitResult> | IntermediaryInitResult;
}

export interface AdapterInitResult extends InitResult {
    instance: Adapter;
    info: any;
}

export interface AdapterPlugin extends Plugin {
    init(serviceDefinition: ProtoBuf.Namespace, upstream: Callable, config?: any):
        Promise<AdapterInitResult> | AdapterInitResult;
}
