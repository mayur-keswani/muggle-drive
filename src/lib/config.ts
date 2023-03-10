let config = {
  env:process.env.REACT_APP_ENVIRONMENT,
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT_DEV,
  awsBucketName: process.env.REACT_APP_BUCKET_NAME_DEV,
};
if (process.env.REACT_APP_ENVIRONMENT==='qa'){
  config = { ...config};  //update here
} 
export default config;