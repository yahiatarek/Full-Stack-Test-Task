const BASEURL = 'http://localhost:3000';

export const signin = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch('http://localhost:3000/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    // If the response status is not OK, throw an error with the status
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const signup = async ({ email, password, name }: { email: string; password: string; name: string }) => {
  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    // If the response status is not OK, throw an error with the status
    throw new Error(`${errorResponse?.message}`);
  }

  const data = await response.json();
  return data;
};
