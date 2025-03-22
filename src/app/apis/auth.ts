const BASEURL = 'http://localhost:3000';

export const signin = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${BASEURL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    // If the response status is not OK, throw an error with the status
    throw new Error(`HTTP error! Status: ${errorResponse?.message}`);
  }

  const data = await response.json();
  return data;
};

export const signup = async ({ email, password, name, data }: { email: string; password: string; name: string; data: string }) => {
  const response = await fetch(`${BASEURL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, data }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    // If the response status is not OK, throw an error with the status
    throw new Error(`${errorResponse?.message}`);
  }

  const res = await response.json();
  return res;
};

export const getUserData = async (token: string) => {
  const response = await fetch(`${BASEURL}/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    // If the response status is not OK, throw an error with the status
    throw new Error(`${errorResponse?.message}`);
  }

  const res = await response.json();
  return res;
};
