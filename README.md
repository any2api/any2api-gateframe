# any2api-gateway

Core framework of the any2api ecosystem to expose domain/business logic through different kinds of APIs.
By default, domain/business logic is implemented as (micro)service, exposing its functionality through a gRPC API.

**Adapters** (e.g. REST/HTTP adapter or GraphQL adapter) are implemented as plugins of the framework to expose functionality through diverse APIs.
Another kind of plugin supported by the framework are **intermediaries** to provide reusable technical logic (like request rate limiting or authentication).
Domain/business logic that is not exposed through a gRPC API can be connected to the any2api-gateway through **connector** plugins (such as an AWS Lambda connector or OpenAPI connector).

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
An alternative to using the admin API is providing `Config` messages as JSON files that are read by the any2api-gateway during start.
Plugins are available as npm modules.
They are fetched and loaded on demand when configurations are added.



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
  * ...
  * CLI adapter (docs endpoint with usage info and how to install CLI tool)
* Intermediary candidates
  * ...
* Connector candidates
  * ...
* Allow local "one-file" plugins to be loaded into any2api-gateway during start
* **TODO** any2api backlog: move relevant aspects to here!
