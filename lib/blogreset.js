const fs = require("fs");
const blog_gen_all = require("./blogpost-gen-all");
exports.reset = () => {
  fs.writeFileSync("./index/assetdepends.json", "[]");
  emptydir("./html/blog/post");
  fs.writeFileSync("./index/blogs.json", "[]");
  emptydir("./html/blog/assets");
  blog_gen_all.generate();
}
const emptydir = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      if(file === "static"){
        continue
      }
      fs.unlink(`${directory}/${file}`, (err) => {
        if (err) throw err;
      });
    }
  });
}