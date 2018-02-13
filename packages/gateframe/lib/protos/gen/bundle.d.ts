import * as $protobuf from "protobufjs";

/** Namespace any2api. */
export namespace any2api {

    /** Namespace gateframe. */
    namespace gateframe {

        /** Represents an AdminService */
        class AdminService extends $protobuf.rpc.Service {

            /**
             * Constructs a new AdminService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Creates new AdminService service using the specified rpc implementation.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             * @returns RPC service. Useful where requests and/or responses are streamed.
             */
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): AdminService;

            /**
             * Calls CreateConfig.
             * @param request CreateConfigRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateConfigResponse
             */
            public createConfig(request: any2api.gateframe.ICreateConfigRequest, callback: any2api.gateframe.AdminService.CreateConfigCallback): void;

            /**
             * Calls CreateConfig.
             * @param request CreateConfigRequest message or plain object
             * @returns Promise
             */
            public createConfig(request: any2api.gateframe.ICreateConfigRequest): Promise<any2api.gateframe.CreateConfigResponse>;

            /**
             * Calls DeleteConfig.
             * @param request DeleteConfigRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Empty
             */
            public deleteConfig(request: any2api.gateframe.IDeleteConfigRequest, callback: any2api.gateframe.AdminService.DeleteConfigCallback): void;

            /**
             * Calls DeleteConfig.
             * @param request DeleteConfigRequest message or plain object
             * @returns Promise
             */
            public deleteConfig(request: any2api.gateframe.IDeleteConfigRequest): Promise<google.protobuf.Empty>;

            /**
             * Calls GetConfig.
             * @param request GetConfigRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Config
             */
            public getConfig(request: any2api.gateframe.IGetConfigRequest, callback: any2api.gateframe.AdminService.GetConfigCallback): void;

            /**
             * Calls GetConfig.
             * @param request GetConfigRequest message or plain object
             * @returns Promise
             */
            public getConfig(request: any2api.gateframe.IGetConfigRequest): Promise<any2api.gateframe.Config>;
        }

        namespace AdminService {

            /**
             * Callback as used by {@link any2api.gateframe.AdminService#createConfig}.
             * @param error Error, if any
             * @param [response] CreateConfigResponse
             */
            type CreateConfigCallback = (error: (Error|null), response?: any2api.gateframe.CreateConfigResponse) => void;

            /**
             * Callback as used by {@link any2api.gateframe.AdminService#deleteConfig}.
             * @param error Error, if any
             * @param [response] Empty
             */
            type DeleteConfigCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

            /**
             * Callback as used by {@link any2api.gateframe.AdminService#getConfig}.
             * @param error Error, if any
             * @param [response] Config
             */
            type GetConfigCallback = (error: (Error|null), response?: any2api.gateframe.Config) => void;
        }

        /** Properties of a Config. */
        interface IConfig {

            /** Config protoService */
            protoService?: (any2api.gateframe.Config.IProtoService|null);

            /** Config connector */
            connector?: (any2api.gateframe.Config.IPlugin|null);

            /** Config intermediaries */
            intermediaries?: (any2api.gateframe.Config.IPlugin[]|null);

            /** Config adapter */
            adapter?: (any2api.gateframe.Config.IPlugin|null);
        }

        /** Represents a Config. */
        class Config implements IConfig {

            /**
             * Constructs a new Config.
             * @param [properties] Properties to set
             */
            constructor(properties?: any2api.gateframe.IConfig);

            /** Config protoService. */
            public protoService?: (any2api.gateframe.Config.IProtoService|null);

            /** Config connector. */
            public connector?: (any2api.gateframe.Config.IPlugin|null);

            /** Config intermediaries. */
            public intermediaries: any2api.gateframe.Config.IPlugin[];

            /** Config adapter. */
            public adapter?: (any2api.gateframe.Config.IPlugin|null);

            /** Config protoOrConnector. */
            public protoOrConnector?: ("protoService"|"connector");

            /**
             * Creates a new Config instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Config instance
             */
            public static create(properties?: any2api.gateframe.IConfig): any2api.gateframe.Config;

            /**
             * Encodes the specified Config message. Does not implicitly {@link any2api.gateframe.Config.verify|verify} messages.
             * @param message Config message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: any2api.gateframe.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Config message, length delimited. Does not implicitly {@link any2api.gateframe.Config.verify|verify} messages.
             * @param message Config message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: any2api.gateframe.IConfig, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Config message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): any2api.gateframe.Config;

            /**
             * Decodes a Config message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Config
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): any2api.gateframe.Config;

            /**
             * Verifies a Config message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Config message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Config
             */
            public static fromObject(object: { [k: string]: any }): any2api.gateframe.Config;

            /**
             * Creates a plain object from a Config message. Also converts values to other types if specified.
             * @param message Config
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: any2api.gateframe.Config, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Config to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace Config {

            /** Properties of a ProtoService. */
            interface IProtoService {

                /** ProtoService protoPackageName */
                protoPackageName?: (string|null);

                /**
                 * The complete proto service definition as a string.
                 * All includes must be absolute URIs, as this definitions has no location.
                 * The exception are google proto definitions that start with `google`
                 * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
                 * or, in the [google api repository](https://github.com/googleapis/googleapis/)
                 */
                protoDefinition?: (string|null);

                /**
                 * Url where to retrieve the proto service definition.
                 * All includes must be absolute URIs, as this definitions has no location.
                 * The exception are google proto definitions that start with `google`
                 * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
                 * or, in the [google api repository](https://github.com/googleapis/googleapis/)
                 */
                protoUrl?: (string|null);

                /** ProtoService host */
                host?: (string|null);

                /** ProtoService port */
                port?: (number|null);
            }

            /** Represents a ProtoService. */
            class ProtoService implements IProtoService {

                /**
                 * Constructs a new ProtoService.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: any2api.gateframe.Config.IProtoService);

                /** ProtoService protoPackageName. */
                public protoPackageName: string;

                /**
                 * The complete proto service definition as a string.
                 * All includes must be absolute URIs, as this definitions has no location.
                 * The exception are google proto definitions that start with `google`
                 * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
                 * or, in the [google api repository](https://github.com/googleapis/googleapis/)
                 */
                public protoDefinition: string;

                /**
                 * Url where to retrieve the proto service definition.
                 * All includes must be absolute URIs, as this definitions has no location.
                 * The exception are google proto definitions that start with `google`
                 * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
                 * or, in the [google api repository](https://github.com/googleapis/googleapis/)
                 */
                public protoUrl: string;

                /** ProtoService host. */
                public host: string;

                /** ProtoService port. */
                public port: number;

                /** ProtoService defOrUrl. */
                public defOrUrl?: ("protoDefinition"|"protoUrl");

                /**
                 * Creates a new ProtoService instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ProtoService instance
                 */
                public static create(properties?: any2api.gateframe.Config.IProtoService): any2api.gateframe.Config.ProtoService;

                /**
                 * Encodes the specified ProtoService message. Does not implicitly {@link any2api.gateframe.Config.ProtoService.verify|verify} messages.
                 * @param message ProtoService message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: any2api.gateframe.Config.IProtoService, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ProtoService message, length delimited. Does not implicitly {@link any2api.gateframe.Config.ProtoService.verify|verify} messages.
                 * @param message ProtoService message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: any2api.gateframe.Config.IProtoService, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ProtoService message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ProtoService
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): any2api.gateframe.Config.ProtoService;

                /**
                 * Decodes a ProtoService message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ProtoService
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): any2api.gateframe.Config.ProtoService;

                /**
                 * Verifies a ProtoService message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ProtoService message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ProtoService
                 */
                public static fromObject(object: { [k: string]: any }): any2api.gateframe.Config.ProtoService;

                /**
                 * Creates a plain object from a ProtoService message. Also converts values to other types if specified.
                 * @param message ProtoService
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: any2api.gateframe.Config.ProtoService, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ProtoService to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Plugin. */
            interface IPlugin {

                /** Plugin packageName */
                packageName?: (string|null);

                /** Plugin pluginConfig */
                pluginConfig?: (google.protobuf.IAny|null);

                /**
                 * optional
                 * Field of the package to use as plugin.
                 * This enabled to pack multiple plugins into one package.
                 */
                pluginName?: (string|null);
            }

            /** Represents a Plugin. */
            class Plugin implements IPlugin {

                /**
                 * Constructs a new Plugin.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: any2api.gateframe.Config.IPlugin);

                /** Plugin packageName. */
                public packageName: string;

                /** Plugin pluginConfig. */
                public pluginConfig?: (google.protobuf.IAny|null);

                /**
                 * optional
                 * Field of the package to use as plugin.
                 * This enabled to pack multiple plugins into one package.
                 */
                public pluginName: string;

                /**
                 * Creates a new Plugin instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Plugin instance
                 */
                public static create(properties?: any2api.gateframe.Config.IPlugin): any2api.gateframe.Config.Plugin;

                /**
                 * Encodes the specified Plugin message. Does not implicitly {@link any2api.gateframe.Config.Plugin.verify|verify} messages.
                 * @param message Plugin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: any2api.gateframe.Config.IPlugin, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Plugin message, length delimited. Does not implicitly {@link any2api.gateframe.Config.Plugin.verify|verify} messages.
                 * @param message Plugin message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: any2api.gateframe.Config.IPlugin, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Plugin message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Plugin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): any2api.gateframe.Config.Plugin;

                /**
                 * Decodes a Plugin message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Plugin
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): any2api.gateframe.Config.Plugin;

                /**
                 * Verifies a Plugin message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Plugin message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Plugin
                 */
                public static fromObject(object: { [k: string]: any }): any2api.gateframe.Config.Plugin;

                /**
                 * Creates a plain object from a Plugin message. Also converts values to other types if specified.
                 * @param message Plugin
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: any2api.gateframe.Config.Plugin, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Plugin to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a CreateConfigRequest. */
        interface ICreateConfigRequest {

            /** CreateConfigRequest config */
            config?: (any2api.gateframe.IConfig|null);
        }

        /** Represents a CreateConfigRequest. */
        class CreateConfigRequest implements ICreateConfigRequest {

            /**
             * Constructs a new CreateConfigRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: any2api.gateframe.ICreateConfigRequest);

            /** CreateConfigRequest config. */
            public config?: (any2api.gateframe.IConfig|null);

            /**
             * Creates a new CreateConfigRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CreateConfigRequest instance
             */
            public static create(properties?: any2api.gateframe.ICreateConfigRequest): any2api.gateframe.CreateConfigRequest;

            /**
             * Encodes the specified CreateConfigRequest message. Does not implicitly {@link any2api.gateframe.CreateConfigRequest.verify|verify} messages.
             * @param message CreateConfigRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: any2api.gateframe.ICreateConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CreateConfigRequest message, length delimited. Does not implicitly {@link any2api.gateframe.CreateConfigRequest.verify|verify} messages.
             * @param message CreateConfigRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: any2api.gateframe.ICreateConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateConfigRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): any2api.gateframe.CreateConfigRequest;

            /**
             * Decodes a CreateConfigRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CreateConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): any2api.gateframe.CreateConfigRequest;

            /**
             * Verifies a CreateConfigRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CreateConfigRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateConfigRequest
             */
            public static fromObject(object: { [k: string]: any }): any2api.gateframe.CreateConfigRequest;

            /**
             * Creates a plain object from a CreateConfigRequest message. Also converts values to other types if specified.
             * @param message CreateConfigRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: any2api.gateframe.CreateConfigRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateConfigRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateConfigResponse. */
        interface ICreateConfigResponse {

            /** CreateConfigResponse configId */
            configId?: (string|null);
        }

        /** Represents a CreateConfigResponse. */
        class CreateConfigResponse implements ICreateConfigResponse {

            /**
             * Constructs a new CreateConfigResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: any2api.gateframe.ICreateConfigResponse);

            /** CreateConfigResponse configId. */
            public configId: string;

            /**
             * Creates a new CreateConfigResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CreateConfigResponse instance
             */
            public static create(properties?: any2api.gateframe.ICreateConfigResponse): any2api.gateframe.CreateConfigResponse;

            /**
             * Encodes the specified CreateConfigResponse message. Does not implicitly {@link any2api.gateframe.CreateConfigResponse.verify|verify} messages.
             * @param message CreateConfigResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: any2api.gateframe.ICreateConfigResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CreateConfigResponse message, length delimited. Does not implicitly {@link any2api.gateframe.CreateConfigResponse.verify|verify} messages.
             * @param message CreateConfigResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: any2api.gateframe.ICreateConfigResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateConfigResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateConfigResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): any2api.gateframe.CreateConfigResponse;

            /**
             * Decodes a CreateConfigResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CreateConfigResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): any2api.gateframe.CreateConfigResponse;

            /**
             * Verifies a CreateConfigResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CreateConfigResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateConfigResponse
             */
            public static fromObject(object: { [k: string]: any }): any2api.gateframe.CreateConfigResponse;

            /**
             * Creates a plain object from a CreateConfigResponse message. Also converts values to other types if specified.
             * @param message CreateConfigResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: any2api.gateframe.CreateConfigResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateConfigResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DeleteConfigRequest. */
        interface IDeleteConfigRequest {

            /** DeleteConfigRequest configId */
            configId?: (string|null);
        }

        /** Represents a DeleteConfigRequest. */
        class DeleteConfigRequest implements IDeleteConfigRequest {

            /**
             * Constructs a new DeleteConfigRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: any2api.gateframe.IDeleteConfigRequest);

            /** DeleteConfigRequest configId. */
            public configId: string;

            /**
             * Creates a new DeleteConfigRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeleteConfigRequest instance
             */
            public static create(properties?: any2api.gateframe.IDeleteConfigRequest): any2api.gateframe.DeleteConfigRequest;

            /**
             * Encodes the specified DeleteConfigRequest message. Does not implicitly {@link any2api.gateframe.DeleteConfigRequest.verify|verify} messages.
             * @param message DeleteConfigRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: any2api.gateframe.IDeleteConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeleteConfigRequest message, length delimited. Does not implicitly {@link any2api.gateframe.DeleteConfigRequest.verify|verify} messages.
             * @param message DeleteConfigRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: any2api.gateframe.IDeleteConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeleteConfigRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeleteConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): any2api.gateframe.DeleteConfigRequest;

            /**
             * Decodes a DeleteConfigRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeleteConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): any2api.gateframe.DeleteConfigRequest;

            /**
             * Verifies a DeleteConfigRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeleteConfigRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeleteConfigRequest
             */
            public static fromObject(object: { [k: string]: any }): any2api.gateframe.DeleteConfigRequest;

            /**
             * Creates a plain object from a DeleteConfigRequest message. Also converts values to other types if specified.
             * @param message DeleteConfigRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: any2api.gateframe.DeleteConfigRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeleteConfigRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetConfigRequest. */
        interface IGetConfigRequest {

            /** GetConfigRequest configId */
            configId?: (string|null);
        }

        /** Represents a GetConfigRequest. */
        class GetConfigRequest implements IGetConfigRequest {

            /**
             * Constructs a new GetConfigRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: any2api.gateframe.IGetConfigRequest);

            /** GetConfigRequest configId. */
            public configId: string;

            /**
             * Creates a new GetConfigRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetConfigRequest instance
             */
            public static create(properties?: any2api.gateframe.IGetConfigRequest): any2api.gateframe.GetConfigRequest;

            /**
             * Encodes the specified GetConfigRequest message. Does not implicitly {@link any2api.gateframe.GetConfigRequest.verify|verify} messages.
             * @param message GetConfigRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: any2api.gateframe.IGetConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetConfigRequest message, length delimited. Does not implicitly {@link any2api.gateframe.GetConfigRequest.verify|verify} messages.
             * @param message GetConfigRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: any2api.gateframe.IGetConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetConfigRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): any2api.gateframe.GetConfigRequest;

            /**
             * Decodes a GetConfigRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetConfigRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): any2api.gateframe.GetConfigRequest;

            /**
             * Verifies a GetConfigRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetConfigRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetConfigRequest
             */
            public static fromObject(object: { [k: string]: any }): any2api.gateframe.GetConfigRequest;

            /**
             * Creates a plain object from a GetConfigRequest message. Also converts values to other types if specified.
             * @param message GetConfigRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: any2api.gateframe.GetConfigRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetConfigRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
