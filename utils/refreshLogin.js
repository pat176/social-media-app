const refreshLogin = (onAutoAuth, onFetchPosts, Router, Axios) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    let data = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    Axios.post(
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyAaxgPQIhxzY0df_51sT_NLZiIuYZ_aKeI",
      data
    ).then((res) => {
      onAutoAuth(res.data.id_token, res.data.user_id, res.data.refresh_token);
      console.log(res.data);
      if (Router.pathname === "/") {
        Router.replace("/edit-profile");
      } else if (Router.pathname === "/home") {
        onFetchPosts(Axios, res.data.id_token);
      }
    });
  } else {
    if (Router.pathname !== "/") {
      Router.replace("/");
    }
  }
};
export default refreshLogin;
