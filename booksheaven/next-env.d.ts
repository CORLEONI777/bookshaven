/// <reference types="next" />
/// <reference types="next/image-types/global" />

type CloudflareEnv = {
  DB: D1Database;
  BOOK_CACHE?: KVNamespace;
  COVERS?: R2Bucket;
  AMAZON_ASSOCIATE_TAG?: string;
};
