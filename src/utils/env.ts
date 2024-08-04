const envConfig = () => ({
  port: process.env.PORT,
  randomImagePrefixURL: process.env.RANDOM_IMAGE_PREFIX_URL,
});

export default envConfig;
