import { AdminService, Config, ConfigInstance } from "../admin-service";
import { Server } from "net";
import * as express from 'express';
import { InfoProvider } from "@any2api/gateframe-common";

/**
 * Service that serves the information provided using a REST API
 */
export class InfoService {

    server: Server;

    constructor(private adminService: AdminService, private infoPort: number) {}

    async init() {
        const app = express();

        app.get(['', '/'], (req, res) => this.listInfo(req, res));
        app.get('/:configID', (req, res) => this.getInfo(req, res));
        app.get('/:configID/adapter', (req, res) => this.getInfo(req, res, (x) => x.adapter));
        app.get('/:configID/connector', (req, res) => this.getInfo(req, res, (x) => x.connector));
        app.get('/:configID/intermediaries', (req, res) => this.getInfo(req, res, (x) => x.intermediaries));
        app.get('/:configID/intermediaries/:index', (req, res) => this.getInfo(req, res, (x) => x.intermediaries && x.intermediaries[req.params.index]));

        return new Promise((resolve, reject) => {
            this.server = app.listen(this.infoPort, (err) => {
                if(err) { return reject(err);}
                resolve();
            })
        });
    }

    async stop() {
        return this.server && new Promise((resolve, reject) => this.server.close((err) => err && reject(err) || resolve()));
    }

    private listInfo(req: express.Request, res: express.Response) {
        const configsPromises = this.adminService.getConfigIDs().map(async id => this.getInfoForConfig(id).then(info => info && { ...info, href: `/${id}` }));

        Promise.all(configsPromises)
            .then(configs => this.sendJson(res, configs))
            .catch(
                e => {
                    console.error(e);
                    res.status(500);
                    res.end();
                }
            );
    }

    private sendJson(res: express.Response, data: any) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data, null, '  '));
    }

    private getInfo(req: express.Request, res: express.Response, mapper: (x: any) => any = (x) => x) {
        const id = req.params.configID;

        this.getInfoForConfig(id)
            .then(config => {
                const result = config && mapper(config);
                if(!result) {
                    res.status(404);
                    return res.end();
                }
                this.sendJson(res, result);
            }).catch(e => {
                console.error(e);
                res.status(500);
                res.end();
            });  
    }

    private async getInfoForConfig(id: string) {
        const config = this.adminService.getConfig(id);

        // remove plugin object
        const sanitize = (obj) => ({ ...obj, plugin: undefined});

        if (!config) { return null; }

        const infos = await this.getInfoForInstance(this.adminService.getConfigInstance(id));

        return {
            connector: { config: sanitize(config.connector || config.protoService), info: infos[0] },
            adapter: { config: sanitize(config.adapter), info: infos[1] },
            intermediaries: config.intermediaries.map((intermediaryConfig, i) => ({ config: sanitize(intermediaryConfig), info: infos[i + 2] }))
        };
    }

    private async getInfoForInstance(configInstance: ConfigInstance): Promise<any[]> {
        if(!configInstance) { return []; }

        const info = async (infoProvider: InfoProvider) => infoProvider.getInfo && await infoProvider.getInfo();

        const infos = [info(configInstance.connector.instance), info(configInstance.adapter.instance),
            ...configInstance.intermediaries.map(i => info(i.instance))];

        return Promise.all(infos);
    }
}