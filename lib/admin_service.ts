// type definitions equivalent to the types definined in admin_service.proto

import { Message, Type, Field, OneOf } from "protobufjs";
import { loadProtoSync } from "./proto-loader";
import { join } from "path";

const adminServiceProto = loadProtoSync(join(__dirname, 'admin_service.proto'));

export const ProtoService = adminServiceProto.lookupType('adminServiceProto');

export class ProtoService extends Message<ProtoService> {

    /**
     * optional field to override the namespace of the proto file.
     */
    @Field.d(1, "string")
    public protoPackageName: string;

    /**
     * The complete proto service definition as a string.
     * All includes must be absolute URIs, as this definitions has no location.
     * The exception are google proto definitions that start with `google`
     * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
     * or, in the [google api repository](https://github.com/googleapis/googleapis/)
     */
    @Field.d(2, "string")
    public protoDefinition: string;

    /**
     * Url where to retrieve the proto service definition.
     * All includes must be absolute URIs, as this definitions has no location.
     * The exception are google proto definitions that start with `google`
     * and exists in the [protobuf repository](https://github.com/google/protobuf/tree/master/src/google/protobuf)
     * or, in the [google api repository](https://github.com/googleapis/googleapis/)
     */
    @Field.d(3, "string")
    public protoUrl: string;

    @OneOf.d("protoDefinition", "protoUrl")
    public definitionOrUrl: "protoDefinition" | "protoUrl";

    @Field.d(4, "string")
    public host: string;

    @Field.d(5, "uint32")
    public port: number;
}

@Type.d("Config")
export class Config extends Message<Config> {

    

}
