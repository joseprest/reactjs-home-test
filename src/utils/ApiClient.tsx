//data fetching api uses this client including states and cities.
// const Auth_Token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJqb3NlcmVzdC43aW9AZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiR2pfSGNnSDQ1cVhLTE1MVmUzT3JOT2szRnV1by1GRl9hTlFvbTM4VzJHTTRlWW4xLVJYRllEdkRzb01qb2lUX1RHNCJ9LCJleHAiOjE2ODg5MDY4NDF9.AvPnWXxyq4cPsU4wZgmLHyTllgGcUDZn7yRpP07CEE0";
import { getToken } from "../accessProvider";
// let getAuthToken = async () => await getToken();

const client = async (url: string) => {
  const authToken = await getToken();
  console.log("Bearer Token", authToken)
  const config = {
    method: "GET",
    body: undefined,
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    },
  };
  return window.fetch(url, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export { client };
