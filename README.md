# any2api-gateframe

Core framework of the any2api ecosystem to expose domain/business logic through different kinds of APIs.
By default, domain/business logic is implemented as (micro)service, exposing its functionality through a gRPC API.
Essentially, **any2api-gateframe** is a *gateway framework* to build specific gateways:

> gateframe + set of plugins + configuration = gateway

**Adapters** (e.g. REST/HTTP adapter or GraphQL adapter) are implemented as plugins of the framework to expose functionality through diverse APIs.
Another kind of plugin supported by the framework are **intermediaries** to provide reusable technical logic (like request rate limiting or authentication).
Domain/business logic that is not exposed through a gRPC API can be connected to the gateway through **connector** plugins (such as an AWS Lambda connector or OpenAPI connector).

All plugins should be as generic and reusable as possible to use them in conjunction with diverse plugins and services.
Two specific plugins are part of the framework, namely the **gRPC connector** and the **gRPC adapter**.
The framework prescribes interfaces to be implemented by plugins:

```
TODO add TS interface definitions
```

The framework itself provides an admin API (gRPC) to register and deregister services:

```
service Admin {
  rpc AddConfig (AddConfigRequest) returns (AddConfigResponse)
  rpc RemoveConfig (RemoveConfigRequest) returns (google.protobuf.Empty)
  rpc GetConfig (GetConfigRequest) returns (GetConfigResponse)
}

message Config {
  message ProtoService {
    // optional package name to override package in proto definition
    string proto_package_name
    // inline proto definition or URL to proto definition
    oneof def_or_url {
      string proto_definition
      string proto_url
    }
  }
  message Connector {
    string plugin_name // npm package name
    google.protobuf.Any plugin_config
  }
  message Intermediary {
    string plugin_name
    google.protobuf.Any plugin_config
  }
  message Adapter {
    string plugin_name
    google.protobuf.Any plugin_config
  }
  oneof proto_or_connector {
    ProtoService proto_service
    Connector connector
  }
  repeated Intermediary intermediaries
  Adapter adapter
}

message AddConfigRequest {
  Config config
}

message AddConfigResponse {
  string config_id
}

message RemoveConfigRequest {
  string config_id
}

message GetConfigRequest {
  string config_id
}

message GetConfigResponse {
  Config config
}
```

This admin API can be disabled, for example for security purposes.
An alternative to using the admin API is providing `Config` messages as JSON files that are read by the gateway during start.
Plugins are available as npm modules.
They are specified as npm dependencies at deployment time of the gateway.



## Architecture

**TODO** (generic, independent from implementation)



## Implementation & deployment

The current implementation is based on Node.js.
However, the architecture is generic and can be implemented in Golang or another language, for example to make the performance even better.
Moreover, multiple gateways (like Node.js and Golang) could be combined to run extremely performance-critical plugins (like intermediaries) in Golang and utilize a rich ecosystem of Node.js at the same time.

**TODO** add details



## Further ideas

* Global gateway config: blacklist/whitelist of plugins
* "Eat your own dogfood" - use adapters for admin service of gateway
* Adapter candidates
  * gRPC Web: https://github.com/improbable-eng/grpc-web
  * REST/HTTP
  * REST/Kong: https://getkong.org
  * SOAP/WSDL
  * GraphQL
    * https://github.com/google/rejoiner
  * http://restql.b2w.io/
  * https://mmikowski.github.io/json-pure/
  * https://github.com/uber/tchannel
  * https://github.com/mikeal/znode
  * push STDIN messages as Server Sent Events: https://github.com/benas/ssed
  * Jabber/XMPP
  * https://www.w3.org/TR/pubsub/
  * BERT-RPC
  * cloud-native messaging: http://nats.io
  * the new REST: http://graphql.org
  * virtual JSON resource on client: https://netflix.github.io/falcor/
  * Terraform modules: https://terraform.io/docs/modules/create.html
  * TOSCA node type
  * NPM module (exporting JS functions)
  * Web UI
  * use redis (or http://webd.is) pub/sub to interact with APIs
  * use kue to interact with APIs: https://github.com/Automattic/kue
  * JSON-RPC
    * http://uber.github.io/multitransport-jsonrpc
    * http://en.m.wikipedia.org/wiki/JSON-WSP
  * XML-RPC?
  * Java RMI?
  * SocketIO (w/ WebSocket)
  * SockJS
  * SQL
  * Thrift
  * microservice frameworks
    * http://senecajs.org
    * https://hemerajs.github.io/hemera-site/
  * Kafka, KafkaStreams: https://dev.to/danlebrero/simplifying-your-microservices-architecture-with-kafka-and-kafkastreams
  * CLI adapter (docs endpoint with usage info and how to install CLI tool)
    * interactive CLI using a library such as https://www.npmjs.com/package/inquirer
* Intermediary candidates
  * Service mesh like Envoy
  * "Sidecar for endpoint security" (TW Tech Radar)
  * Token-based Authentication
  * API Monitoring & Prometheus Metrics Pull Interface (requests per minute, etc.)
  * Interface Filter (hide gRPC operation/parameter, etc.)
  * Circuit Breaker
  * Request Rate Limiting
  * Monitoring (DataDog?)
  * Authentication (OpenID?)
  * Authorization (OAuth 2.0)
  * Auditing & Logging
  * Request size limiting
  * Request filtering (by content or headers)
  * Request transformer
  * Response transformer
  * Correlation ID
  * see https://getkong.org plugins for more ideas
  * ...
* Connector candidates
  * OpenAPI
  * AWS Lambda
  * gRPC API Merge/Combine Connector to consolidate multiple gRPC APIs into a single one, which is then provided to the first intermediary
  * https://wrapapi.com
  * DB connector, e.g. mongodb-connector to expose DB functionality through any kind of API
  * ...
* Allow local "one-file" plugins to be loaded into any2api-gateframe during start
* **TODO** any2api backlog: move relevant aspects to here!
