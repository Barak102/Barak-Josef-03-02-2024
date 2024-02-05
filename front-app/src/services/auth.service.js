export const registerClient = async (clientId) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientId: +clientId }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};
