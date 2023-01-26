const fs = require("fs");
const blogindex_gen = require("./blogindex-gen");
exports.reset = () => {
  fs.writeFileSync("./index/assetdepends.json", "[]");
  emptydir("./html/blog/post");
  fs.writeFileSync("./index/blogs.json", "[]");
  emptydir("./blog");
  blogindex_gen.generate();
}
const emptydir = (directory) => {
  fs.readdirSync(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlinkSync(`${directory}/${file}`, (err) => {
        if (err) throw err;
      });
    }
  });
}