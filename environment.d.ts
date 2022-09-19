declare namespace NodeJS {
  export interface ProcessEnv {
    ENVIRONMENT?: string;
    PORT?: number;

    MYSQL_ROOT_PASSWORD?: string;
    MYSQL_DATABASE?: string;
    MYSQL_USER?: string;
    MYSQL_PASSWORD?: string;
    MYSQL_HOST?: string;
    MYSQL_PORT?: string;

    SESSION_SECRET?: string;
    BCRYPT_SECRET?: string;

    REDIS_HOST?: string;
    REDIS_PORT?: string;
  }
}
