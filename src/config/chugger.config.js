export default () => {
  return {
    server: {
      hostname: "localhost",
      port: 443,
      https: {
        certFile: "src/config/localhost.crt",
        keyFile: "src/config/localhost.key",
      },
    },
    watch: {
      src: "/assets",
      public: {
        url: "/",
        build: false,
      },
    },
  };
};
