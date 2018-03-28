import { Config } from './admin-service';
import { AdminService } from './index';
import { finalize } from '../../common/node_modules/@reactivex/rxjs/dist/package/operators/finalize';
import { InfoService } from './info-service/info-service';

export const runConfigs = async (configs: Config[], { infoPort }: { infoPort?: number } = {}) => {
    try {
        const adminService = new AdminService();
        let infoService: InfoService;

        await Promise.all(configs.map((config) => adminService.createConfig(config)));

        if (infoPort) {
            infoService = new InfoService(adminService, infoPort);
            await infoService.init();
        }

        process.on('SIGINT', async () => {
            try {
                await adminService.deleteAll();
                infoService && await infoService.stop();
            } catch (e) {
                console.error('Error shuting down configurations:', e);
                process.exit(5);
            }
            process.exit();
        });
        
    } catch (e) {
        console.error('error starting configs', e);
        return process.exit(4);
    }
};
