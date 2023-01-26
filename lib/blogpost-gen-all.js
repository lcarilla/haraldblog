const fs = require("fs");
const blogindex_gen = require("./blogindex-gen");
const blogpost_gen = require("./blogpost-gen");
exports.generate = () => {
    const blogs = JSON.parse(fs.readFileSync("./index/blogs.json"));
    blogs.forEach(b => {
        blogpost_gen.generate(`./blog/${b.url}.json`, false);
    });
    blogindex_gen.generate();
}   
