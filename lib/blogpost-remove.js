const fs = require("fs");
const blogindex_gen = require("./blogindex-gen");
exports.remove = (URL) => {
    var found = false;
    let blogs = JSON.parse(fs.readFileSync("./index/blogs.json"));
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].url === URL) {
            found = true;
            blogs.splice(i, 1);
            i--;
        }
    }
    if (found) {
        fs.unlinkSync(`./html/blog/post/${URL}.html`);
        const blog = JSON.parse(fs.readFileSync(`./blog/${URL}.json`));
        fs.unlinkSync(`./blog/${URL}.json`);
        removeassets(blog);
    }
    fs.writeFileSync("./index/blogs.json", JSON.stringify(blogs));
    blogindex_gen.generate();
}
const removeassets = (blog) => {
    console.log("deleting assets...");
    let ASSETDEPENDS = JSON.parse(fs.readFileSync("./index/assetdepends.json"));
    blog.content.forEach(e => {
        if (e?.src !== undefined) {
            for (let i = 0; i < ASSETDEPENDS.length; i++) {
                if (ASSETDEPENDS[i] === e.src) {
                    ASSETDEPENDS.splice(i, 1);
                    break;
                }
            }
            if (!ASSETDEPENDS.includes(e.src)) {
                fs.unlinkSync(`./html/assets/${e.src}`);
            }
        }
    });
    fs.writeFileSync("./index/assetdepends.json", JSON.stringify(ASSETDEPENDS));
}