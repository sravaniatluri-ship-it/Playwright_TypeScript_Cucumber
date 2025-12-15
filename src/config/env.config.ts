export const Environments = {
  main: {
    baseUrl: "https://practicesoftwaretesting.com",
    apiBaseUrl: "https://api.practicesoftwaretesting.com",
  },
  bugs: {
    baseUrl: "https://with-bugs.practicesoftwaretesting.com",
    apiBaseUrl: "https://api-with-bugs.practicesoftwaretesting.com",
  },
};

export type Env = keyof typeof Environments;

export const getCurrentEnv = (): Env => {
  const fromEnv = process.env.TEST_ENV as Env | undefined;
  return fromEnv && Environments[fromEnv] ? fromEnv : "main";
};

export const getEnvConfig = () => Environments[getCurrentEnv()];
