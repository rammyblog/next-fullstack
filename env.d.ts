declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      DB_URI: string;
      SALT_WORK_FACTOR: string;
    }
  }
}

export {}
