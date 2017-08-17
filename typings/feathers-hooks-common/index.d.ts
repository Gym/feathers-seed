declare module 'feathers-hooks-common' {
  interface IHooksProvider {
    callbackToPromise: any;
    checkContext: any;
    checkContextIf: any;
    client: any;
    combine: any;
    debug: any;
    deleteByDot: any;
    dePopulate: any;
    disable: any;
    disallow: any;
    disableMultiItemChange: any;
    discard: any;
    existsByDot: any;
    getByDot: any;
    getItems: any;
    isProvider: any;
    legacyPopulate: any;
    lowerCase: any;
    paramsForServer: any;
    paramsFromClient: any;
    populate: any;
    pluck: any;
    pluckQuery: any;
    preventChanges: any;
    promiseToCallback: any;
    remove: any;
    removeQuery: any;
    replaceItems: any;
    serialize: any;
    setByDot: any;
    setCreatedAt: any;
    setNow: any;
    setSlug: any;
    setUpdatedAt: any;
    sifter: any;
    softDelete: any;
    stashBefore: any;
    thenifyHook: any;
    traverse: any;
    validate: any;
    validateSchema: any;


    iffElse: any;
    iff: any;
    when: any;
    unless: any;
    some: any;
    every: any;
    isNot: any;
  }

  const service: IHooksProvider;

  export = service;
}
