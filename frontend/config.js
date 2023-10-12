import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.API_PRODUCTION
  : publicRuntimeConfig.API_DEVELOPMENT;

export const socketAPI = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.SOCKET_PRODUCTION
  : publicRuntimeConfig.SOCKET_DEVELOPMENT;

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;

export const JWT_ACCOUNT_DETAILS_SECURITY_CODE =
  publicRuntimeConfig.JWT_ACCOUNT_DETAILS_SECURITY_CODE;
