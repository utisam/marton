const config = {
  transform: {
    "^.+\\.(t|j)sx?$": [
      "esbuild-jest",
      {
        format: "esm",
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
export default config;
