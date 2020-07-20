const getDownloadUrl = (gender, storage, thenStatement, catchStatement) => {
  const gsReference = storage.refFromURL(
    `gs://social-media-website-13b03.appspot.com/defaultProfilePhotos/${gender}.jpg`
  );
  console.log("GET DOWNLOAD URL RUNNING");
  gsReference
    .getDownloadURL()
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      console.log(url);
      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = function (event) {
        var blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
      console.log(url + "{GET DOWNLOAD URL}");
      if (thenStatement) {
        thenStatement(url);
      } else {
        return url;
      }
      // Or inserted into an <img> element:
      // return url;
    })
    .catch(function (error) {
      // Handle any errors
      console.log(error.response.data);
      if (catchStatement) {
        catchStatement();
      }
    });
};

export default getDownloadUrl;
