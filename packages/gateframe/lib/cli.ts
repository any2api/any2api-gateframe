#!/usr/bin/env node

import * as yaml from 'js-yaml';
import { readFile } from 'fs';
import { Config, AdminService } from './admin-service';
import { runConfigs } from './run-config';

(() => {
    if (process.argv.length !== 3) {
        console.error('This commands expect 1 parameter: The config file.');
        process.exit(1);
    }
    
    const filename = process.argv[2];
    
    readFile(filename, async (error, data) => {
        if (error) {
            console.error(error);
            return process.exit(2);
        }

        try {
            const obj = yaml.safeLoad(data.toString());

            const configs: Config[] = obj.configs ? obj.configs : [obj];
            
            await runConfigs(configs);

        } catch (e) {
            console.error(e);
            return process.exit(3);
        }
    });
})();
