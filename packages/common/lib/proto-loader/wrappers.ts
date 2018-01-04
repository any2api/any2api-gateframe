import * as ProtoBuf from 'protobufjs';

ProtoBuf.wrappers['.google.protobuf.Any'] = {
    
    fromObject(object) {
        // unwrap value type if mapped
        if (object && object['@type']) {
            const type = this.lookup(object['@type']);
            /* istanbul ignore else */
            if (type && type instanceof ProtoBuf.Type) {
                // type_url does not accept leading "."
                const typeUrl = object['@type'].charAt(0) === '.' ?
                    object['@type'].substr(1) : object['@type'];
                // type_url prefix is optional, but path seperator is required
                return this.create({
                    typeUrl: '/' + typeUrl,
                    value: type.encode(type.fromObject(object)).finish()
                });
            }
        }

        return this.fromObject(object);
    },

    toObject(message: any, options) {

        // decode value if requested and unmapped
        if (options && options.json && message.typeUrl && message.value) {
            // Only use fully qualified type name after the last '/'
            const name = message.typeUrl.substring(message.typeUrl.lastIndexOf('/') + 1);
            const type = this.lookup(name);
            /* istanbul ignore else */
            if (type && type instanceof ProtoBuf.Type) {
                message = type.decode(message.value);
            }
        }

        // wrap value if unmapped
        if (!(message instanceof this.ctor) && message instanceof ProtoBuf.Message) {
            const object = message.$type.toObject(message, options);
            object['@type'] = message.$type.fullName;
            return object;
        }

        return this.toObject(message, options);
    }
};

ProtoBuf.wrappers['.google.protobuf.Timestamp'] = {
    
    // TODO: from Object for Timestamp not well supported
    fromObject(obj) {
        if (typeof obj.getTime === 'function') {
            const millis = obj.getTime();
            const seconds = Math.floor(millis / 1000);
            
            return this.create({ seconds, nanos: (millis - seconds * 1000) * 1000000 });
        }

        return this.fromObject(obj);
    },

    toObject(message: any, options) {
        return message && new Date(message.seconds.toNumber() * 1000 + message.nanos / 1000000);
    }
};
