export interface InfoProvider {
    getInfo?(): Promise<any> | any;
}
