/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.any2api = (function() {
    
        /**
         * Namespace any2api.
         * @exports any2api
         * @namespace
         */
        var any2api = {};
    
        any2api.gateway = (function() {
    
            /**
             * Namespace gateway.
             * @memberof any2api
             * @namespace
             */
            var gateway = {};
    
            gateway.AdminService = (function() {
    
                /**
                 * Constructs a new AdminService service.
                 * @memberof any2api.gateway
                 * @classdesc Represents an AdminService
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function AdminService(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }
    
                (AdminService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = AdminService;
    
                /**
                 * Creates new AdminService service using the specified rpc implementation.
                 * @function create
                 * @memberof any2api.gateway.AdminService
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {AdminService} RPC service. Useful where requests and/or responses are streamed.
                 */
                AdminService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };
    
                /**
                 * Callback as used by {@link any2api.gateway.AdminService#createConfig}.
                 * @memberof any2api.gateway.AdminService
                 * @typedef CreateConfigCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {any2api.gateway.CreateConfigResponse} [response] CreateConfigResponse
                 */
    
                /**
                 * Calls CreateConfig.
                 * @function createConfig
                 * @memberof any2api.gateway.AdminService
                 * @instance
                 * @param {any2api.gateway.ICreateConfigRequest} request CreateConfigRequest message or plain object
                 * @param {any2api.gateway.AdminService.CreateConfigCallback} callback Node-style callback called with the error, if any, and CreateConfigResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                AdminService.prototype.createConfig = function createConfig(request, callback) {
                    return this.rpcCall(createConfig, $root.any2api.gateway.CreateConfigRequest, $root.any2api.gateway.CreateConfigResponse, request, callback);
                };
    
                /**
                 * Calls CreateConfig.
                 * @function createConfig
                 * @memberof any2api.gateway.AdminService
                 * @instance
                 * @param {any2api.gateway.ICreateConfigRequest} request CreateConfigRequest message or plain object
                 * @returns {Promise<any2api.gateway.CreateConfigResponse>} Promise
                 * @variation 2
                 */
    
                /**
                 * Callback as used by {@link any2api.gateway.AdminService#deleteConfig}.
                 * @memberof any2api.gateway.AdminService
                 * @typedef DeleteConfigCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {google.protobuf.Empty} [response] Empty
                 */
    
                /**
                 * Calls DeleteConfig.
                 * @function deleteConfig
                 * @memberof any2api.gateway.AdminService
                 * @instance
                 * @param {any2api.gateway.IDeleteConfigRequest} request DeleteConfigRequest message or plain object
                 * @param {any2api.gateway.AdminService.DeleteConfigCallback} callback Node-style callback called with the error, if any, and Empty
                 * @returns {undefined}
                 * @variation 1
                 */
                AdminService.prototype.deleteConfig = function deleteConfig(request, callback) {
                    return this.rpcCall(deleteConfig, $root.any2api.gateway.DeleteConfigRequest, $root.google.protobuf.Empty, request, callback);
                };
    
                /**
                 * Calls DeleteConfig.
                 * @function deleteConfig
                 * @memberof any2api.gateway.AdminService
                 * @instance
                 * @param {any2api.gateway.IDeleteConfigRequest} request DeleteConfigRequest message or plain object
                 * @returns {Promise<google.protobuf.Empty>} Promise
                 * @variation 2
                 */
    
                /**
                 * Callback as used by {@link any2api.gateway.AdminService#getConfig}.
                 * @memberof any2api.gateway.AdminService
                 * @typedef GetConfigCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {any2api.gateway.Config} [response] Config
                 */
    
                /**
                 * Calls GetConfig.
                 * @function getConfig
                 * @memberof any2api.gateway.AdminService
                 * @instance
                 * @param {any2api.gateway.IGetConfigRequest} request GetConfigRequest message or plain object
                 * @param {any2api.gateway.AdminService.GetConfigCallback} callback Node-style callback called with the error, if any, and Config
                 * @returns {undefined}
                 * @variation 1
                 */
                AdminService.prototype.getConfig = function getConfig(request, callback) {
                    return this.rpcCall(getConfig, $root.any2api.gateway.GetConfigRequest, $root.any2api.gateway.Config, request, callback);
                };
    
                /**
                 * Calls GetConfig.
                 * @function getConfig
                 * @memberof any2api.gateway.AdminService
                 * @instance
                 * @param {any2api.gateway.IGetConfigRequest} request GetConfigRequest message or plain object
                 * @returns {Promise<any2api.gateway.Config>} Promise
                 * @variation 2
                 */
    
                return AdminService;
            })();
    
            gateway.Config = (function() {
    
                /**
                 * Properties of a Config.
                 * @memberof any2api.gateway
                 * @interface IConfig
                 * @property {any2api.gateway.Config.IProtoService|null} [protoService] Config protoService
                 * @property {any2api.gateway.Config.IPlugin|null} [connector] Config connector
                 * @property {Array.<any2api.gateway.Config.IPlugin>|null} [intermediaries] Config intermediaries
                 * @property {any2api.gateway.Config.IPlugin|null} [adapter] Config adapter
                 */
    
                /**
                 * Constructs a new Config.
                 * @memberof any2api.gateway
                 * @classdesc Represents a Config.
                 * @implements IConfig
                 * @constructor
                 * @param {any2api.gateway.IConfig=} [properties] Properties to set
                 */
                function Config(properties) {
                    this.intermediaries = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Config protoService.
                 * @member {any2api.gateway.Config.IProtoService|null|undefined} protoService
                 * @memberof any2api.gateway.Config
                 * @instance
                 */
                Config.prototype.protoService = null;
    
                /**
                 * Config connector.
                 * @member {any2api.gateway.Config.IPlugin|null|undefined} connector
                 * @memberof any2api.gateway.Config
                 * @instance
                 */
                Config.prototype.connector = null;
    
                /**
                 * Config intermediaries.
                 * @member {Array.<any2api.gateway.Config.IPlugin>} intermediaries
                 * @memberof any2api.gateway.Config
                 * @instance
                 */
                Config.prototype.intermediaries = $util.emptyArray;
    
                /**
                 * Config adapter.
                 * @member {any2api.gateway.Config.IPlugin|null|undefined} adapter
                 * @memberof any2api.gateway.Config
                 * @instance
                 */
                Config.prototype.adapter = null;
    
                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;
    
                /**
                 * Config protoOrConnector.
                 * @member {"protoService"|"connector"|undefined} protoOrConnector
                 * @memberof any2api.gateway.Config
                 * @instance
                 */
                Object.defineProperty(Config.prototype, "protoOrConnector", {
                    get: $util.oneOfGetter($oneOfFields = ["protoService", "connector"]),
                    set: $util.oneOfSetter($oneOfFields)
                });
    
                /**
                 * Creates a new Config instance using the specified properties.
                 * @function create
                 * @memberof any2api.gateway.Config
                 * @static
                 * @param {any2api.gateway.IConfig=} [properties] Properties to set
                 * @returns {any2api.gateway.Config} Config instance
                 */
                Config.create = function create(properties) {
                    return new Config(properties);
                };
    
                /**
                 * Encodes the specified Config message. Does not implicitly {@link any2api.gateway.Config.verify|verify} messages.
                 * @function encode
                 * @memberof any2api.gateway.Config
                 * @static
                 * @param {any2api.gateway.IConfig} message Config message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Config.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.protoService != null && message.hasOwnProperty("protoService"))
                        $root.any2api.gateway.Config.ProtoService.encode(message.protoService, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.connector != null && message.hasOwnProperty("connector"))
                        $root.any2api.gateway.Config.Plugin.encode(message.connector, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.intermediaries != null && message.intermediaries.length)
                        for (var i = 0; i < message.intermediaries.length; ++i)
                            $root.any2api.gateway.Config.Plugin.encode(message.intermediaries[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    if (message.adapter != null && message.hasOwnProperty("adapter"))
                        $root.any2api.gateway.Config.Plugin.encode(message.adapter, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified Config message, length delimited. Does not implicitly {@link any2api.gateway.Config.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof any2api.gateway.Config
                 * @static
                 * @param {any2api.gateway.IConfig} message Config message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Config.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a Config message from the specified reader or buffer.
                 * @function decode
                 * @memberof any2api.gateway.Config
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {any2api.gateway.Config} Config
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Config.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.any2api.gateway.Config();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2:
                            message.protoService = $root.any2api.gateway.Config.ProtoService.decode(reader, reader.uint32());
                            break;
                        case 3:
                            message.connector = $root.any2api.gateway.Config.Plugin.decode(reader, reader.uint32());
                            break;
                        case 4:
                            if (!(message.intermediaries && message.intermediaries.length))
                                message.intermediaries = [];
                            message.intermediaries.push($root.any2api.gateway.Config.Plugin.decode(reader, reader.uint32()));
                            break;
                        case 5:
                            message.adapter = $root.any2api.gateway.Config.Plugin.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a Config message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof any2api.gateway.Config
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {any2api.gateway.Config} Config
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Config.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a Config message.
                 * @function verify
                 * @memberof any2api.gateway.Config
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Config.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.protoService != null && message.hasOwnProperty("protoService")) {
                        properties.protoOrConnector = 1;
                        {
                            var error = $root.any2api.gateway.Config.ProtoService.verify(message.protoService);
                            if (error)
                                return "protoService." + error;
                        }
                    }
                    if (message.connector != null && message.hasOwnProperty("connector")) {
                        if (properties.protoOrConnector === 1)
                            return "protoOrConnector: multiple values";
                        properties.protoOrConnector = 1;
                        {
                            var error = $root.any2api.gateway.Config.Plugin.verify(message.connector);
                            if (error)
                                return "connector." + error;
                        }
                    }
                    if (message.intermediaries != null && message.hasOwnProperty("intermediaries")) {
                        if (!Array.isArray(message.intermediaries))
                            return "intermediaries: array expected";
                        for (var i = 0; i < message.intermediaries.length; ++i) {
                            var error = $root.any2api.gateway.Config.Plugin.verify(message.intermediaries[i]);
                            if (error)
                                return "intermediaries." + error;
                        }
                    }
                    if (message.adapter != null && message.hasOwnProperty("adapter")) {
                        var error = $root.any2api.gateway.Config.Plugin.verify(message.adapter);
                        if (error)
                            return "adapter." + error;
                    }
                    return null;
                };
    
                /**
                 * Creates a Config message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof any2api.gateway.Config
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {any2api.gateway.Config} Config
                 */
                Config.fromObject = function fromObject(object) {
                    if (object instanceof $root.any2api.gateway.Config)
                        return object;
                    var message = new $root.any2api.gateway.Config();
                    if (object.protoService != null) {
                        if (typeof object.protoService !== "object")
                            throw TypeError(".any2api.gateway.Config.protoService: object expected");
                        message.protoService = $root.any2api.gateway.Config.ProtoService.fromObject(object.protoService);
                    }
                    if (object.connector != null) {
                        if (typeof object.connector !== "object")
                            throw TypeError(".any2api.gateway.Config.connector: object expected");
                        message.connector = $root.any2api.gateway.Config.Plugin.fromObject(object.connector);
                    }
                    if (object.intermediaries) {
                        if (!Array.isArray(object.intermediaries))
                            throw TypeError(".any2api.gateway.Config.intermediaries: array expected");
                        message.intermediaries = [];
                        for (var i = 0; i < object.intermediaries.length; ++i) {
                            if (typeof object.intermediaries[i] !== "object")
                                throw TypeError(".any2api.gateway.Config.intermediaries: object expected");
                            message.intermediaries[i] = $root.any2api.gateway.Config.Plugin.fromObject(object.intermediaries[i]);
                        }
                    }
                    if (object.adapter != null) {
                        if (typeof object.adapter !== "object")
                            throw TypeError(".any2api.gateway.Config.adapter: object expected");
                        message.adapter = $root.any2api.gateway.Config.Plugin.fromObject(object.adapter);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a Config message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof any2api.gateway.Config
                 * @static
                 * @param {any2api.gateway.Config} message Config
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Config.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.intermediaries = [];
                    if (options.defaults)
                        object.adapter = null;
                    if (message.protoService != null && message.hasOwnProperty("protoService")) {
                        object.protoService = $root.any2api.gateway.Config.ProtoService.toObject(message.protoService, options);
                        if (options.oneofs)
                            object.protoOrConnector = "protoService";
                    }
                    if (message.connector != null && message.hasOwnProperty("connector")) {
                        object.connector = $root.any2api.gateway.Config.Plugin.toObject(message.connector, options);
                        if (options.oneofs)
                            object.protoOrConnector = "connector";
                    }
                    if (message.intermediaries && message.intermediaries.length) {
                        object.intermediaries = [];
                        for (var j = 0; j < message.intermediaries.length; ++j)
                            object.intermediaries[j] = $root.any2api.gateway.Config.Plugin.toObject(message.intermediaries[j], options);
                    }
                    if (message.adapter != null && message.hasOwnProperty("adapter"))
                        object.adapter = $root.any2api.gateway.Config.Plugin.toObject(message.adapter, options);
                    return object;
                };
    
                /**
                 * Converts this Config to JSON.
                 * @function toJSON
                 * @memberof any2api.gateway.Config
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Config.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                Config.ProtoService = (function() {
    
                    /**
                     * Properties of a ProtoService.
                     * @memberof any2api.gateway.Config
                     * @interface IProtoService
                     * @property {string|null} [protoPackageName] ProtoService protoPackageName
                     * @property {string|null} [protoDefinition] The complete proto service definition as a string.
                     * All includes must be absolute URIs, as this definitions has no location.
                     * The exception are google proto definitions that start with `google`
                     * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
                     * or, in the [google api repository](https://github.com/googleapis/googleapis/)
                     * @property {string|null} [protoUrl] Url where to retrieve the proto service definition.
                     * All includes must be absolute URIs, as this definitions has no location.
                     * The exception are google proto definitions that start with `google`
                     * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
                     * or, in the [google api repository](https://github.com/googleapis/googleapis/)
                     * @property {string|null} [host] ProtoService host
                     * @property {number|null} [port] ProtoService port
                     */
    
                    /**
                     * Constructs a new ProtoService.
                     * @memberof any2api.gateway.Config
                     * @classdesc Represents a ProtoService.
                     * @implements IProtoService
                     * @constructor
                     * @param {any2api.gateway.Config.IProtoService=} [properties] Properties to set
                     */
                    function ProtoService(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * ProtoService protoPackageName.
                     * @member {string} protoPackageName
                     * @memberof any2api.gateway.Config.ProtoService
                     * @instance
                     */
                    ProtoService.prototype.protoPackageName = "";
    
                    /**
                     * The complete proto service definition as a string.
                     * All includes must be absolute URIs, as this definitions has no location.
                     * The exception are google proto definitions that start with `google`
                     * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
                     * or, in the [google api repository](https://github.com/googleapis/googleapis/)
                     * @member {string} protoDefinition
                     * @memberof any2api.gateway.Config.ProtoService
                     * @instance
                     */
                    ProtoService.prototype.protoDefinition = "";
    
                    /**
                     * Url where to retrieve the proto service definition.
                     * All includes must be absolute URIs, as this definitions has no location.
                     * The exception are google proto definitions that start with `google`
                     * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
                     * or, in the [google api repository](https://github.com/googleapis/googleapis/)
                     * @member {string} protoUrl
                     * @memberof any2api.gateway.Config.ProtoService
                     * @instance
                     */
                    ProtoService.prototype.protoUrl = "";
    
                    /**
                     * ProtoService host.
                     * @member {string} host
                     * @memberof any2api.gateway.Config.ProtoService
                     * @instance
                     */
                    ProtoService.prototype.host = "";
    
                    /**
                     * ProtoService port.
                     * @member {number} port
                     * @memberof any2api.gateway.Config.ProtoService
                     * @instance
                     */
                    ProtoService.prototype.port = 0;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * ProtoService defOrUrl.
                     * @member {"protoDefinition"|"protoUrl"|undefined} defOrUrl
                     * @memberof any2api.gateway.Config.ProtoService
                     * @instance
                     */
                    Object.defineProperty(ProtoService.prototype, "defOrUrl", {
                        get: $util.oneOfGetter($oneOfFields = ["protoDefinition", "protoUrl"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new ProtoService instance using the specified properties.
                     * @function create
                     * @memberof any2api.gateway.Config.ProtoService
                     * @static
                     * @param {any2api.gateway.Config.IProtoService=} [properties] Properties to set
                     * @returns {any2api.gateway.Config.ProtoService} ProtoService instance
                     */
                    ProtoService.create = function create(properties) {
                        return new ProtoService(properties);
                    };
    
                    /**
                     * Encodes the specified ProtoService message. Does not implicitly {@link any2api.gateway.Config.ProtoService.verify|verify} messages.
                     * @function encode
                     * @memberof any2api.gateway.Config.ProtoService
                     * @static
                     * @param {any2api.gateway.Config.IProtoService} message ProtoService message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProtoService.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.protoPackageName != null && message.hasOwnProperty("protoPackageName"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.protoPackageName);
                        if (message.protoDefinition != null && message.hasOwnProperty("protoDefinition"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.protoDefinition);
                        if (message.protoUrl != null && message.hasOwnProperty("protoUrl"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.protoUrl);
                        if (message.host != null && message.hasOwnProperty("host"))
                            writer.uint32(/* id 4, wireType 2 =*/34).string(message.host);
                        if (message.port != null && message.hasOwnProperty("port"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.port);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified ProtoService message, length delimited. Does not implicitly {@link any2api.gateway.Config.ProtoService.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof any2api.gateway.Config.ProtoService
                     * @static
                     * @param {any2api.gateway.Config.IProtoService} message ProtoService message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ProtoService.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a ProtoService message from the specified reader or buffer.
                     * @function decode
                     * @memberof any2api.gateway.Config.ProtoService
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {any2api.gateway.Config.ProtoService} ProtoService
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtoService.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.any2api.gateway.Config.ProtoService();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.protoPackageName = reader.string();
                                break;
                            case 2:
                                message.protoDefinition = reader.string();
                                break;
                            case 3:
                                message.protoUrl = reader.string();
                                break;
                            case 4:
                                message.host = reader.string();
                                break;
                            case 5:
                                message.port = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a ProtoService message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof any2api.gateway.Config.ProtoService
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {any2api.gateway.Config.ProtoService} ProtoService
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ProtoService.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a ProtoService message.
                     * @function verify
                     * @memberof any2api.gateway.Config.ProtoService
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ProtoService.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.protoPackageName != null && message.hasOwnProperty("protoPackageName"))
                            if (!$util.isString(message.protoPackageName))
                                return "protoPackageName: string expected";
                        if (message.protoDefinition != null && message.hasOwnProperty("protoDefinition")) {
                            properties.defOrUrl = 1;
                            if (!$util.isString(message.protoDefinition))
                                return "protoDefinition: string expected";
                        }
                        if (message.protoUrl != null && message.hasOwnProperty("protoUrl")) {
                            if (properties.defOrUrl === 1)
                                return "defOrUrl: multiple values";
                            properties.defOrUrl = 1;
                            if (!$util.isString(message.protoUrl))
                                return "protoUrl: string expected";
                        }
                        if (message.host != null && message.hasOwnProperty("host"))
                            if (!$util.isString(message.host))
                                return "host: string expected";
                        if (message.port != null && message.hasOwnProperty("port"))
                            if (!$util.isInteger(message.port))
                                return "port: integer expected";
                        return null;
                    };
    
                    /**
                     * Creates a ProtoService message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof any2api.gateway.Config.ProtoService
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {any2api.gateway.Config.ProtoService} ProtoService
                     */
                    ProtoService.fromObject = function fromObject(object) {
                        if (object instanceof $root.any2api.gateway.Config.ProtoService)
                            return object;
                        var message = new $root.any2api.gateway.Config.ProtoService();
                        if (object.protoPackageName != null)
                            message.protoPackageName = String(object.protoPackageName);
                        if (object.protoDefinition != null)
                            message.protoDefinition = String(object.protoDefinition);
                        if (object.protoUrl != null)
                            message.protoUrl = String(object.protoUrl);
                        if (object.host != null)
                            message.host = String(object.host);
                        if (object.port != null)
                            message.port = object.port >>> 0;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a ProtoService message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof any2api.gateway.Config.ProtoService
                     * @static
                     * @param {any2api.gateway.Config.ProtoService} message ProtoService
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ProtoService.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.protoPackageName = "";
                            object.host = "";
                            object.port = 0;
                        }
                        if (message.protoPackageName != null && message.hasOwnProperty("protoPackageName"))
                            object.protoPackageName = message.protoPackageName;
                        if (message.protoDefinition != null && message.hasOwnProperty("protoDefinition")) {
                            object.protoDefinition = message.protoDefinition;
                            if (options.oneofs)
                                object.defOrUrl = "protoDefinition";
                        }
                        if (message.protoUrl != null && message.hasOwnProperty("protoUrl")) {
                            object.protoUrl = message.protoUrl;
                            if (options.oneofs)
                                object.defOrUrl = "protoUrl";
                        }
                        if (message.host != null && message.hasOwnProperty("host"))
                            object.host = message.host;
                        if (message.port != null && message.hasOwnProperty("port"))
                            object.port = message.port;
                        return object;
                    };
    
                    /**
                     * Converts this ProtoService to JSON.
                     * @function toJSON
                     * @memberof any2api.gateway.Config.ProtoService
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ProtoService.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return ProtoService;
                })();
    
                Config.Plugin = (function() {
    
                    /**
                     * Properties of a Plugin.
                     * @memberof any2api.gateway.Config
                     * @interface IPlugin
                     * @property {string|null} [pluginName] Plugin pluginName
                     * @property {google.protobuf.IAny|null} [pluginConfig] Plugin pluginConfig
                     */
    
                    /**
                     * Constructs a new Plugin.
                     * @memberof any2api.gateway.Config
                     * @classdesc Represents a Plugin.
                     * @implements IPlugin
                     * @constructor
                     * @param {any2api.gateway.Config.IPlugin=} [properties] Properties to set
                     */
                    function Plugin(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Plugin pluginName.
                     * @member {string} pluginName
                     * @memberof any2api.gateway.Config.Plugin
                     * @instance
                     */
                    Plugin.prototype.pluginName = "";
    
                    /**
                     * Plugin pluginConfig.
                     * @member {google.protobuf.IAny|null|undefined} pluginConfig
                     * @memberof any2api.gateway.Config.Plugin
                     * @instance
                     */
                    Plugin.prototype.pluginConfig = null;
    
                    /**
                     * Creates a new Plugin instance using the specified properties.
                     * @function create
                     * @memberof any2api.gateway.Config.Plugin
                     * @static
                     * @param {any2api.gateway.Config.IPlugin=} [properties] Properties to set
                     * @returns {any2api.gateway.Config.Plugin} Plugin instance
                     */
                    Plugin.create = function create(properties) {
                        return new Plugin(properties);
                    };
    
                    /**
                     * Encodes the specified Plugin message. Does not implicitly {@link any2api.gateway.Config.Plugin.verify|verify} messages.
                     * @function encode
                     * @memberof any2api.gateway.Config.Plugin
                     * @static
                     * @param {any2api.gateway.Config.IPlugin} message Plugin message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Plugin.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.pluginName != null && message.hasOwnProperty("pluginName"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.pluginName);
                        if (message.pluginConfig != null && message.hasOwnProperty("pluginConfig"))
                            $root.google.protobuf.Any.encode(message.pluginConfig, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Plugin message, length delimited. Does not implicitly {@link any2api.gateway.Config.Plugin.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof any2api.gateway.Config.Plugin
                     * @static
                     * @param {any2api.gateway.Config.IPlugin} message Plugin message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Plugin.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a Plugin message from the specified reader or buffer.
                     * @function decode
                     * @memberof any2api.gateway.Config.Plugin
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {any2api.gateway.Config.Plugin} Plugin
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Plugin.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.any2api.gateway.Config.Plugin();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.pluginName = reader.string();
                                break;
                            case 2:
                                message.pluginConfig = $root.google.protobuf.Any.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a Plugin message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof any2api.gateway.Config.Plugin
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {any2api.gateway.Config.Plugin} Plugin
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Plugin.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a Plugin message.
                     * @function verify
                     * @memberof any2api.gateway.Config.Plugin
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Plugin.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.pluginName != null && message.hasOwnProperty("pluginName"))
                            if (!$util.isString(message.pluginName))
                                return "pluginName: string expected";
                        if (message.pluginConfig != null && message.hasOwnProperty("pluginConfig")) {
                            var error = $root.google.protobuf.Any.verify(message.pluginConfig);
                            if (error)
                                return "pluginConfig." + error;
                        }
                        return null;
                    };
    
                    /**
                     * Creates a Plugin message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof any2api.gateway.Config.Plugin
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {any2api.gateway.Config.Plugin} Plugin
                     */
                    Plugin.fromObject = function fromObject(object) {
                        if (object instanceof $root.any2api.gateway.Config.Plugin)
                            return object;
                        var message = new $root.any2api.gateway.Config.Plugin();
                        if (object.pluginName != null)
                            message.pluginName = String(object.pluginName);
                        if (object.pluginConfig != null) {
                            if (typeof object.pluginConfig !== "object")
                                throw TypeError(".any2api.gateway.Config.Plugin.pluginConfig: object expected");
                            message.pluginConfig = $root.google.protobuf.Any.fromObject(object.pluginConfig);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a Plugin message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof any2api.gateway.Config.Plugin
                     * @static
                     * @param {any2api.gateway.Config.Plugin} message Plugin
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Plugin.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.pluginName = "";
                            object.pluginConfig = null;
                        }
                        if (message.pluginName != null && message.hasOwnProperty("pluginName"))
                            object.pluginName = message.pluginName;
                        if (message.pluginConfig != null && message.hasOwnProperty("pluginConfig"))
                            object.pluginConfig = $root.google.protobuf.Any.toObject(message.pluginConfig, options);
                        return object;
                    };
    
                    /**
                     * Converts this Plugin to JSON.
                     * @function toJSON
                     * @memberof any2api.gateway.Config.Plugin
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Plugin.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return Plugin;
                })();
    
                return Config;
            })();
    
            gateway.CreateConfigRequest = (function() {
    
                /**
                 * Properties of a CreateConfigRequest.
                 * @memberof any2api.gateway
                 * @interface ICreateConfigRequest
                 * @property {any2api.gateway.IConfig|null} [config] CreateConfigRequest config
                 */
    
                /**
                 * Constructs a new CreateConfigRequest.
                 * @memberof any2api.gateway
                 * @classdesc Represents a CreateConfigRequest.
                 * @implements ICreateConfigRequest
                 * @constructor
                 * @param {any2api.gateway.ICreateConfigRequest=} [properties] Properties to set
                 */
                function CreateConfigRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * CreateConfigRequest config.
                 * @member {any2api.gateway.IConfig|null|undefined} config
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @instance
                 */
                CreateConfigRequest.prototype.config = null;
    
                /**
                 * Creates a new CreateConfigRequest instance using the specified properties.
                 * @function create
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @static
                 * @param {any2api.gateway.ICreateConfigRequest=} [properties] Properties to set
                 * @returns {any2api.gateway.CreateConfigRequest} CreateConfigRequest instance
                 */
                CreateConfigRequest.create = function create(properties) {
                    return new CreateConfigRequest(properties);
                };
    
                /**
                 * Encodes the specified CreateConfigRequest message. Does not implicitly {@link any2api.gateway.CreateConfigRequest.verify|verify} messages.
                 * @function encode
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @static
                 * @param {any2api.gateway.ICreateConfigRequest} message CreateConfigRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreateConfigRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.config != null && message.hasOwnProperty("config"))
                        $root.any2api.gateway.Config.encode(message.config, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };
    
                /**
                 * Encodes the specified CreateConfigRequest message, length delimited. Does not implicitly {@link any2api.gateway.CreateConfigRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @static
                 * @param {any2api.gateway.ICreateConfigRequest} message CreateConfigRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreateConfigRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a CreateConfigRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {any2api.gateway.CreateConfigRequest} CreateConfigRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreateConfigRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.any2api.gateway.CreateConfigRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.config = $root.any2api.gateway.Config.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a CreateConfigRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {any2api.gateway.CreateConfigRequest} CreateConfigRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreateConfigRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a CreateConfigRequest message.
                 * @function verify
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CreateConfigRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.config != null && message.hasOwnProperty("config")) {
                        var error = $root.any2api.gateway.Config.verify(message.config);
                        if (error)
                            return "config." + error;
                    }
                    return null;
                };
    
                /**
                 * Creates a CreateConfigRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {any2api.gateway.CreateConfigRequest} CreateConfigRequest
                 */
                CreateConfigRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.any2api.gateway.CreateConfigRequest)
                        return object;
                    var message = new $root.any2api.gateway.CreateConfigRequest();
                    if (object.config != null) {
                        if (typeof object.config !== "object")
                            throw TypeError(".any2api.gateway.CreateConfigRequest.config: object expected");
                        message.config = $root.any2api.gateway.Config.fromObject(object.config);
                    }
                    return message;
                };
    
                /**
                 * Creates a plain object from a CreateConfigRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @static
                 * @param {any2api.gateway.CreateConfigRequest} message CreateConfigRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CreateConfigRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.config = null;
                    if (message.config != null && message.hasOwnProperty("config"))
                        object.config = $root.any2api.gateway.Config.toObject(message.config, options);
                    return object;
                };
    
                /**
                 * Converts this CreateConfigRequest to JSON.
                 * @function toJSON
                 * @memberof any2api.gateway.CreateConfigRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CreateConfigRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return CreateConfigRequest;
            })();
    
            gateway.CreateConfigResponse = (function() {
    
                /**
                 * Properties of a CreateConfigResponse.
                 * @memberof any2api.gateway
                 * @interface ICreateConfigResponse
                 * @property {string|null} [configId] CreateConfigResponse configId
                 */
    
                /**
                 * Constructs a new CreateConfigResponse.
                 * @memberof any2api.gateway
                 * @classdesc Represents a CreateConfigResponse.
                 * @implements ICreateConfigResponse
                 * @constructor
                 * @param {any2api.gateway.ICreateConfigResponse=} [properties] Properties to set
                 */
                function CreateConfigResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * CreateConfigResponse configId.
                 * @member {string} configId
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @instance
                 */
                CreateConfigResponse.prototype.configId = "";
    
                /**
                 * Creates a new CreateConfigResponse instance using the specified properties.
                 * @function create
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @static
                 * @param {any2api.gateway.ICreateConfigResponse=} [properties] Properties to set
                 * @returns {any2api.gateway.CreateConfigResponse} CreateConfigResponse instance
                 */
                CreateConfigResponse.create = function create(properties) {
                    return new CreateConfigResponse(properties);
                };
    
                /**
                 * Encodes the specified CreateConfigResponse message. Does not implicitly {@link any2api.gateway.CreateConfigResponse.verify|verify} messages.
                 * @function encode
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @static
                 * @param {any2api.gateway.ICreateConfigResponse} message CreateConfigResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreateConfigResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.configId);
                    return writer;
                };
    
                /**
                 * Encodes the specified CreateConfigResponse message, length delimited. Does not implicitly {@link any2api.gateway.CreateConfigResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @static
                 * @param {any2api.gateway.ICreateConfigResponse} message CreateConfigResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CreateConfigResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a CreateConfigResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {any2api.gateway.CreateConfigResponse} CreateConfigResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreateConfigResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.any2api.gateway.CreateConfigResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.configId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a CreateConfigResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {any2api.gateway.CreateConfigResponse} CreateConfigResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CreateConfigResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a CreateConfigResponse message.
                 * @function verify
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                CreateConfigResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        if (!$util.isString(message.configId))
                            return "configId: string expected";
                    return null;
                };
    
                /**
                 * Creates a CreateConfigResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {any2api.gateway.CreateConfigResponse} CreateConfigResponse
                 */
                CreateConfigResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.any2api.gateway.CreateConfigResponse)
                        return object;
                    var message = new $root.any2api.gateway.CreateConfigResponse();
                    if (object.configId != null)
                        message.configId = String(object.configId);
                    return message;
                };
    
                /**
                 * Creates a plain object from a CreateConfigResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @static
                 * @param {any2api.gateway.CreateConfigResponse} message CreateConfigResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                CreateConfigResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.configId = "";
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        object.configId = message.configId;
                    return object;
                };
    
                /**
                 * Converts this CreateConfigResponse to JSON.
                 * @function toJSON
                 * @memberof any2api.gateway.CreateConfigResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                CreateConfigResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return CreateConfigResponse;
            })();
    
            gateway.DeleteConfigRequest = (function() {
    
                /**
                 * Properties of a DeleteConfigRequest.
                 * @memberof any2api.gateway
                 * @interface IDeleteConfigRequest
                 * @property {string|null} [configId] DeleteConfigRequest configId
                 */
    
                /**
                 * Constructs a new DeleteConfigRequest.
                 * @memberof any2api.gateway
                 * @classdesc Represents a DeleteConfigRequest.
                 * @implements IDeleteConfigRequest
                 * @constructor
                 * @param {any2api.gateway.IDeleteConfigRequest=} [properties] Properties to set
                 */
                function DeleteConfigRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * DeleteConfigRequest configId.
                 * @member {string} configId
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @instance
                 */
                DeleteConfigRequest.prototype.configId = "";
    
                /**
                 * Creates a new DeleteConfigRequest instance using the specified properties.
                 * @function create
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @static
                 * @param {any2api.gateway.IDeleteConfigRequest=} [properties] Properties to set
                 * @returns {any2api.gateway.DeleteConfigRequest} DeleteConfigRequest instance
                 */
                DeleteConfigRequest.create = function create(properties) {
                    return new DeleteConfigRequest(properties);
                };
    
                /**
                 * Encodes the specified DeleteConfigRequest message. Does not implicitly {@link any2api.gateway.DeleteConfigRequest.verify|verify} messages.
                 * @function encode
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @static
                 * @param {any2api.gateway.IDeleteConfigRequest} message DeleteConfigRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeleteConfigRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.configId);
                    return writer;
                };
    
                /**
                 * Encodes the specified DeleteConfigRequest message, length delimited. Does not implicitly {@link any2api.gateway.DeleteConfigRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @static
                 * @param {any2api.gateway.IDeleteConfigRequest} message DeleteConfigRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeleteConfigRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a DeleteConfigRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {any2api.gateway.DeleteConfigRequest} DeleteConfigRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeleteConfigRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.any2api.gateway.DeleteConfigRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.configId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a DeleteConfigRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {any2api.gateway.DeleteConfigRequest} DeleteConfigRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeleteConfigRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a DeleteConfigRequest message.
                 * @function verify
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeleteConfigRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        if (!$util.isString(message.configId))
                            return "configId: string expected";
                    return null;
                };
    
                /**
                 * Creates a DeleteConfigRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {any2api.gateway.DeleteConfigRequest} DeleteConfigRequest
                 */
                DeleteConfigRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.any2api.gateway.DeleteConfigRequest)
                        return object;
                    var message = new $root.any2api.gateway.DeleteConfigRequest();
                    if (object.configId != null)
                        message.configId = String(object.configId);
                    return message;
                };
    
                /**
                 * Creates a plain object from a DeleteConfigRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @static
                 * @param {any2api.gateway.DeleteConfigRequest} message DeleteConfigRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeleteConfigRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.configId = "";
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        object.configId = message.configId;
                    return object;
                };
    
                /**
                 * Converts this DeleteConfigRequest to JSON.
                 * @function toJSON
                 * @memberof any2api.gateway.DeleteConfigRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeleteConfigRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return DeleteConfigRequest;
            })();
    
            gateway.GetConfigRequest = (function() {
    
                /**
                 * Properties of a GetConfigRequest.
                 * @memberof any2api.gateway
                 * @interface IGetConfigRequest
                 * @property {string|null} [configId] GetConfigRequest configId
                 */
    
                /**
                 * Constructs a new GetConfigRequest.
                 * @memberof any2api.gateway
                 * @classdesc Represents a GetConfigRequest.
                 * @implements IGetConfigRequest
                 * @constructor
                 * @param {any2api.gateway.IGetConfigRequest=} [properties] Properties to set
                 */
                function GetConfigRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * GetConfigRequest configId.
                 * @member {string} configId
                 * @memberof any2api.gateway.GetConfigRequest
                 * @instance
                 */
                GetConfigRequest.prototype.configId = "";
    
                /**
                 * Creates a new GetConfigRequest instance using the specified properties.
                 * @function create
                 * @memberof any2api.gateway.GetConfigRequest
                 * @static
                 * @param {any2api.gateway.IGetConfigRequest=} [properties] Properties to set
                 * @returns {any2api.gateway.GetConfigRequest} GetConfigRequest instance
                 */
                GetConfigRequest.create = function create(properties) {
                    return new GetConfigRequest(properties);
                };
    
                /**
                 * Encodes the specified GetConfigRequest message. Does not implicitly {@link any2api.gateway.GetConfigRequest.verify|verify} messages.
                 * @function encode
                 * @memberof any2api.gateway.GetConfigRequest
                 * @static
                 * @param {any2api.gateway.IGetConfigRequest} message GetConfigRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetConfigRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.configId);
                    return writer;
                };
    
                /**
                 * Encodes the specified GetConfigRequest message, length delimited. Does not implicitly {@link any2api.gateway.GetConfigRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof any2api.gateway.GetConfigRequest
                 * @static
                 * @param {any2api.gateway.IGetConfigRequest} message GetConfigRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetConfigRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a GetConfigRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof any2api.gateway.GetConfigRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {any2api.gateway.GetConfigRequest} GetConfigRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetConfigRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.any2api.gateway.GetConfigRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.configId = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes a GetConfigRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof any2api.gateway.GetConfigRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {any2api.gateway.GetConfigRequest} GetConfigRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetConfigRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a GetConfigRequest message.
                 * @function verify
                 * @memberof any2api.gateway.GetConfigRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetConfigRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        if (!$util.isString(message.configId))
                            return "configId: string expected";
                    return null;
                };
    
                /**
                 * Creates a GetConfigRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof any2api.gateway.GetConfigRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {any2api.gateway.GetConfigRequest} GetConfigRequest
                 */
                GetConfigRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.any2api.gateway.GetConfigRequest)
                        return object;
                    var message = new $root.any2api.gateway.GetConfigRequest();
                    if (object.configId != null)
                        message.configId = String(object.configId);
                    return message;
                };
    
                /**
                 * Creates a plain object from a GetConfigRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof any2api.gateway.GetConfigRequest
                 * @static
                 * @param {any2api.gateway.GetConfigRequest} message GetConfigRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetConfigRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.configId = "";
                    if (message.configId != null && message.hasOwnProperty("configId"))
                        object.configId = message.configId;
                    return object;
                };
    
                /**
                 * Converts this GetConfigRequest to JSON.
                 * @function toJSON
                 * @memberof any2api.gateway.GetConfigRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetConfigRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return GetConfigRequest;
            })();
    
            return gateway;
        })();
    
        return any2api;
    })();
    
    $root.google = (function() {
    
        /**
         * Namespace google.
         * @exports google
         * @namespace
         */
        var google = {};
    
        google.protobuf = (function() {
    
            /**
             * Namespace protobuf.
             * @memberof google
             * @namespace
             */
            var protobuf = {};
    
            protobuf.Empty = (function() {
    
                /**
                 * Properties of an Empty.
                 * @memberof google.protobuf
                 * @interface IEmpty
                 */
    
                /**
                 * Constructs a new Empty.
                 * @memberof google.protobuf
                 * @classdesc Represents an Empty.
                 * @implements IEmpty
                 * @constructor
                 * @param {google.protobuf.IEmpty=} [properties] Properties to set
                 */
                function Empty(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Creates a new Empty instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {google.protobuf.IEmpty=} [properties] Properties to set
                 * @returns {google.protobuf.Empty} Empty instance
                 */
                Empty.create = function create(properties) {
                    return new Empty(properties);
                };
    
                /**
                 * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Empty.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };
    
                /**
                 * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Empty.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an Empty message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Empty} Empty
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Empty.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Empty();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Empty message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.Empty} Empty
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Empty.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an Empty message.
                 * @function verify
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Empty.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };
    
                /**
                 * Creates an Empty message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Empty} Empty
                 */
                Empty.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Empty)
                        return object;
                    return new $root.google.protobuf.Empty();
                };
    
                /**
                 * Creates a plain object from an Empty message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Empty
                 * @static
                 * @param {google.protobuf.Empty} message Empty
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Empty.toObject = function toObject() {
                    return {};
                };
    
                /**
                 * Converts this Empty to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Empty
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Empty.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Empty;
            })();
    
            protobuf.Any = (function() {
    
                /**
                 * Properties of an Any.
                 * @memberof google.protobuf
                 * @interface IAny
                 * @property {string|null} [type_url] Any type_url
                 * @property {Uint8Array|null} [value] Any value
                 */
    
                /**
                 * Constructs a new Any.
                 * @memberof google.protobuf
                 * @classdesc Represents an Any.
                 * @implements IAny
                 * @constructor
                 * @param {google.protobuf.IAny=} [properties] Properties to set
                 */
                function Any(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * Any type_url.
                 * @member {string} type_url
                 * @memberof google.protobuf.Any
                 * @instance
                 */
                Any.prototype.type_url = "";
    
                /**
                 * Any value.
                 * @member {Uint8Array} value
                 * @memberof google.protobuf.Any
                 * @instance
                 */
                Any.prototype.value = $util.newBuffer([]);
    
                /**
                 * Creates a new Any instance using the specified properties.
                 * @function create
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.IAny=} [properties] Properties to set
                 * @returns {google.protobuf.Any} Any instance
                 */
                Any.create = function create(properties) {
                    return new Any(properties);
                };
    
                /**
                 * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
                 * @function encode
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.IAny} message Any message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Any.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type_url != null && message.hasOwnProperty("type_url"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                    if (message.value != null && message.hasOwnProperty("value"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                    return writer;
                };
    
                /**
                 * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.IAny} message Any message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Any.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes an Any message from the specified reader or buffer.
                 * @function decode
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {google.protobuf.Any} Any
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Any.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.type_url = reader.string();
                            break;
                        case 2:
                            message.value = reader.bytes();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };
    
                /**
                 * Decodes an Any message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {google.protobuf.Any} Any
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Any.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies an Any message.
                 * @function verify
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Any.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.type_url != null && message.hasOwnProperty("type_url"))
                        if (!$util.isString(message.type_url))
                            return "type_url: string expected";
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                            return "value: buffer expected";
                    return null;
                };
    
                /**
                 * Creates an Any message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {google.protobuf.Any} Any
                 */
                Any.fromObject = function fromObject(object) {
                    if (object instanceof $root.google.protobuf.Any)
                        return object;
                    var message = new $root.google.protobuf.Any();
                    if (object.type_url != null)
                        message.type_url = String(object.type_url);
                    if (object.value != null)
                        if (typeof object.value === "string")
                            $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                        else if (object.value.length)
                            message.value = object.value;
                    return message;
                };
    
                /**
                 * Creates a plain object from an Any message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof google.protobuf.Any
                 * @static
                 * @param {google.protobuf.Any} message Any
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Any.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.type_url = "";
                        object.value = options.bytes === String ? "" : [];
                    }
                    if (message.type_url != null && message.hasOwnProperty("type_url"))
                        object.type_url = message.type_url;
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                    return object;
                };
    
                /**
                 * Converts this Any to JSON.
                 * @function toJSON
                 * @memberof google.protobuf.Any
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Any.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return Any;
            })();
    
            return protobuf;
        })();
    
        return google;
    })();

    return $root;
});
