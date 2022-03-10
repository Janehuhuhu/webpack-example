module.exports = {
  plugins: {
    "postcss-sprites": {
      // 告诉webpack合并之后的图片保存到什么地方
      spritePath: "./dist/imgs",
          // 告诉webpack合并图片的时候如何分组
        groupBy: function (image) {
            // url: '../images/animal/animal1.png',
            let path = image.url.substr(0, image.url.lastIndexOf("/"));
            // console.log(path, "!!!!!!");
            let name = path.substr(path.lastIndexOf("/") + 1);
            // console.log(name, "!!!!!!!!");
            return Promise.resolve(name);
        },
        //
        filterBy: function (image) {
            let path = image.url;
            if(!/\.png$/.test(path)){
                return Promise.reject();
            }
            return Promise.resolve();
        }
    }
  }
}