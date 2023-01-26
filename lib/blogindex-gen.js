const fs = require("fs");
exports.generate = () => {
    let BLOGPOSTS = ``;
    const blogs = JSON.parse(fs.readFileSync("./index/blogs.json"));
    let final = fs.readFileSync("./gen/blogs.html").toString();
    blogs.forEach(b => {
        BLOGPOSTS += `<div class="blogpost-index"><a class="bloglink" href="/blog/post/${b.url}.html">${b.title}</a><a class="blogsum">${b.sum}</a><a class="blogdate"><img class="cal" src="/blog/assets/static/calendar.png"/>${b.date}</a></div>`;
    });
    const meta = JSON.parse(fs.readFileSync("./config/meta.json"));
    //META
    final = final.replaceAll("__CAPTION__", meta.caption);
    final = final.replace("__DOMAIN__", meta.domain);
    final = final.replace("__OWNER__", meta.owner);
    //META END
    final = final.replace("__BLOGPOSTS__", BLOGPOSTS);
    fs.writeFileSync("./html/blog/index.html", final);
}