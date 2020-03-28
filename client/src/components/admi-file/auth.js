import jwtDecode from "jwt-decode";
export function auth() {
  var user = "";
  try {
    const jwt = localStorage.getItem("token");
    user = jwtDecode(jwt);
    return user;
  } catch (error) {
    if (!user) window.location = "/LoginAdmin";
  }
}
