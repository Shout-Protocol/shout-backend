
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/models/typeDefs.ts",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"]
    }
  }
};

export default config;
