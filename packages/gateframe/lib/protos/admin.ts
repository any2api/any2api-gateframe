// type definitions equivalent to the types definined in admin_service.proto

import { any2api } from './gen/bundle.js';

export const Config = any2api.gateframe.Config;
export const AdminService = any2api.gateframe.AdminService;
export const GetConfigRequest = any2api.gateframe.GetConfigRequest;
export const CreateConfigRequest = any2api.gateframe.CreateConfigRequest;
export const DeleteConfigRequest = any2api.gateframe.DeleteConfigRequest;

export type IConfig = any2api.gateframe.IConfig;
