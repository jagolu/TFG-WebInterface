import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

const googleClientId = "google client-id";
const facebookAppId = "facebook app-id";

const authConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(googleClientId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(facebookAppId)
  }
]);

export const environment = {
  production: false,
};

export function provideConfig(){
  return authConfig;
}

export const GROUP_SOCKET_ID = "chatgroupssoketid";
export const NOTIFICATION_SOCKET_ID = "notificationsoketid";

export const URL = {
  baseURL: "local_backend_url"
  // baseURL: "cloud_backend_url"
}