export const client = async (
  url: string,
  {data, token, headers: customHeaders, ...customConfig }: {
    data?: any, token?: string | null, headers?: any
  } = {}
) => {
  
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      Accept: "application/json",
      ...customHeaders,
    },
    ...customConfig,
  };
  return await window.fetch(url, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
