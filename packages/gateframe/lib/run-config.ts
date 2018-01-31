import { Config } from './admin-service';
import { AdminService } from './index';
import { finalize } from '../../common/node_modules/@reactivex/rxjs/dist/package/operators/finalize';

export const runConfigs = async (configs: Config[]) => {
    try {
        const adminService = new AdminService();

        await Promise.all(configs.map((config) => adminService.createConfig(config)));

        process.on('SIGINT', async () => {
            try {
                await adminService.deleteAll();
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
