// type definitions equivalent to the types definined in admin_service.proto

import { any2api } from './gen/bundle.js';

export const Config = any2api.gateway.Config;
export const AdminService = any2api.gateway.AdminService;
export const GetConfigRequest = any2api.gateway.GetConfigRequest;
export const CreateConfigRequest = any2api.gateway.CreateConfigRequest;
export const DeleteConfigRequest = any2api.gateway.DeleteConfigRequest;

export type IConfig = any2api.gateway.IConfig;
