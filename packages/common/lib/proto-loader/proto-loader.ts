import * as ProtoBuf from 'protobufjs';
import { join, dirname } from 'path';
import { writeFile } from 'fs';
import { promisify } from 'util';
import * as tmp from 'tmp-promise';

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

const writeFilePromise = promisify(writeFile);

export const loadProtoFromString = async (proto: string): Promise<ProtoBuf.Root> => {
    const tempProtoFile: {path: string, cleanup: () => void } = await tmp.file({postfix: '.proto'});
    
    try {
        // write proto to temp file, as protobufjs needs a filename
        await writeFilePromise(tempProtoFile.path, proto);
    
        return loadProto(tempProtoFile.path);
    } finally {
        tempProtoFile.cleanup();
    }
};
