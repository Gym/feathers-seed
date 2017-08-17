declare module 'feathers-authentication-hooks' {
  interface IAuthenticationHooks {
    associateCurrentUser: any,
    queryWithCurrentUser: any,
    restrictToAuthenticated: any,
    restrictToOwner: any,
    restrictToRoles: any,
    hasRoleOrRestrict: any
  }

  const hooks: IAuthenticationHooks;

  export = hooks;
}
