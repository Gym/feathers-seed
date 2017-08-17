declare module 'feathers-authentication-local' {
  interface IAuthenticationStrategy {
    hooks: any,
  }

  const service: IAuthenticationStrategy;

  export = service;
}
