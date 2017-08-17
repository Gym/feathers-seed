import { HookMap, HooksObject } from 'feathers-hooks';

class AppHookEvents implements HookMap {
  all: any[] = [];
  find: any[] = [];
  get: any[] = [];
  create: any[] = [];
  update: any[] = [];
  patch: any[] = [];
  remove: any[] = [];
}

export abstract class AppHooks implements HooksObject {
  before: AppHookEvents = new AppHookEvents();
  after: AppHookEvents = new AppHookEvents();
  error: AppHookEvents = new AppHookEvents();
}
