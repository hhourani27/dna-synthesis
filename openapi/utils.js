const requestJwtToken = async (url) => {
  const formData = new FormData();
  formData.append("login", "admin");
  formData.append("password", "any_password");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const jsonBody = await response.json();
  return jsonBody.token;
};

module.exports = {
  requestJwtToken,
};
