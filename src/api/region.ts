import { client } from "./client";
import { setValue, getValue } from "../utils/localStorage";

const StateURL = "https://www.universal-tutorial.com/api/states/United States";
const AccessTokenUrl = "https://www.universal-tutorial.com/api/getaccesstoken";
const AccessTokenKey = "__access_api_token__";
const token = process.env.REACT_APP_UNIVERSAL_API_TOKEN;
const email = process.env.REACT_APP_UNIVERSAL_EMAIL;

export const getAccessApiToken = async () => {
  console.log("get token")
  await client(AccessTokenUrl, {
    headers: {
      "api-token": `${token}`,  
      Accept: "application/json",
      "user-email": email,
    },
  }).then( async ({auth_token}) =>{
    console.log("set token by getAccessToken")
    await setValue(AccessTokenKey, auth_token)});
};

export const getRegionStates = async () => {
  const authToken = getValue("__access_api_token__");
  console.log("get state api")
  return await client(StateURL, { token: authToken });
};

export const getRegionCities = async (url: string) => {
  const authToken = getValue("__access_api_token__");
  return await client(url, { token: authToken });
};
