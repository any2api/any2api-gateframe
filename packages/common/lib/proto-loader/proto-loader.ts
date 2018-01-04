import * as ProtoBuf from 'protobufjs';
import { join, dirname } from 'path';

import * as tmp from 'tmp-promise';

import './wrappers';
import { writeFile } from 'fs';

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

export const loadProtoFromString = async (proto: string): Promise<ProtoBuf.Root> => {
    const tempProtoFile: {path: string, cleanup: () => void } = await tmp.file({postfix: '.proto'});
    
    try {
        // write proto to temp file, as protobufjs needs a filename
        await new Promise<void>((resolve, reject) => {
            writeFile(tempProtoFile.path, proto, (err) => {
                if (err) { return reject(err); }

                resolve();
            });
        });
    
        return loadProto(tempProtoFile.path);
    } finally {
        tempProtoFile.cleanup();
    }
};
