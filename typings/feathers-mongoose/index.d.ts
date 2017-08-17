declare module 'feathers-mongoose' {
  import * as mongoose from 'mongoose';

  interface IOptions {
    Model: mongoose.Model<any>;
    discriminators?: any[];
    id?: string;
    paginate?: any;
    lean?: boolean;
    overwrite?: boolean;
    events?: any[];
    }

  // Test
  function service(options: IOptions): () => void;

  module service {}

  export = service;
}
