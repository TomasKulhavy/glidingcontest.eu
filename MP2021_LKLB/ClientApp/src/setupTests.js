const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock the request issued by the react app to get the client configuration parameters.
window.fetch = () => {
  return Promise.resolve(
    {
      ok: true,
      json: () => Promise.resolve({
        "authority": `${process.env.REACT_APP_BACKEND_URL}`,
        "client_id": "MP2021_LKLB",
        "redirect_uri": `${process.env.REACT_APP_BACKEND_URL}/authentication/login-callback`,
        "post_logout_redirect_uri": `${process.env.REACT_APP_BACKEND_URL}/authentication/logout-callback`,
        "response_type": "id_token token",
        "scope": "MP2021_LKLB openid profile"
     })
    });
};
