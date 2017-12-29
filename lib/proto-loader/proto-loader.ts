import * as ProtoBuf from 'protobufjs';
import { join, dirname } from 'path';

import './wrappers';

const googleProtoFiles = dirname(require.resolve('google-proto-files'));

export const resolvePath = (origin, target) => {
    if (target.startsWith('google')) {
        return join(googleProtoFiles, target);
    } else {
        return join(dirname(origin), target);
    }
};

export function loadProto(filename: string) {
    const root = new ProtoBuf.Root();
    root.resolvePath = resolvePath;
    return root.load(filename);
}

export function loadProtoSync(filename: string) {
    const root = new ProtoBuf.Root();
    root.resolvePath = resolvePath;
    return root.loadSync(filename);
}
