const AccessTokenKey = "__access_api_token__";

const getToken = () => {
  return window.localStorage.getItem(AccessTokenKey);
}

const handleTokenResponse = ({ auth_token }) => {
  window.localStorage.setItem(AccessTokenKey, auth_token);
  return auth_token;
};

const getAccessApiToken = async (url) => {
  await client(url).then(handleTokenResponse);
};

const token = 
  "Gj_HcgH45qXKLMLVe3OrNOk3Fuuo-FF_aNQom38W2GM4eYn1-RXFYDvDsoMjoiT_TG4";
const email = "joserest.7io@gmail.com";

// endpoint = process.env

async function client(url) {
  const config = {
    method: "GET",
    body: undefined,
    headers: {
      "api-token": `${token}`,
      Accept: "application/json",
      "user-email": email,
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
}

export { getToken, getAccessApiToken };
