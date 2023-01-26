const fs = require("fs");
const blogindex_gen = require("./blogindex-gen");
exports.generate = (PATH, ifnew) => {
    const blog = JSON.parse(fs.readFileSync(PATH));
    if (ifnew) { console.log("reading new blog JSON...") }
    const meta = JSON.parse(fs.readFileSync("./config/meta.json"));
    let final = fs.readFileSync("./gen/blogpost.html").toString();
    let ASSETDEPENDS = JSON.parse(fs.readFileSync("./index/assetdepends.json"));
    const TITLE = blog.title;
    const DATE = new Date().toDateString();
    const URL = blog.url;
    const intro = blog.intro;
    const content = blog.content;
    const SUM = blog.sum;
    let CONTENT = ``;
    let INTRO = ``;
    if (ifnew) { console.log("setting up HTML...") }
    //META
    final = final.replace("__CAPTION__", meta.caption);
    final = final.replace("__DOMAIN__", meta.domain);
    final = final.replace("__OWNER__", meta.owner);
    //META END
    //TITLE
    final = final.replaceAll("__TITLE__", TITLE);
    //TITLE END
    //INTRO
    intro.forEach(e => {
        INTRO += `<a class="blogintro">${e}</a>`;
    });
    final = final.replace("__INTRO__", INTRO);
    //INTRO END
    //CONTENT
    content.forEach(e => {
        if (e.t === "e") {
            CONTENT += `<a class="blogcontentelem">${e.c}</a>`;
        }
        else if (e.t === "c") {
            CONTENT += `\n<pre><code>\n${e.c}  \n\n</code></pre>`;
        }
        else if (e.t === "img") {
            CONTENT += `<img class="blogimg" src="/blog/assets/${e.c}"/>`;
            fs.copyFileSync(`./new/${e.c}`, `./html/blog/assets/${e.c}`);
            ASSETDEPENDS.push(e.c);
        }else if(e.t === "cf"){
            const code = fs.readFileSync(`./new/${e.c}`);
            CONTENT += `\n<pre><code>\n${code}  \n\n</code></pre>`;
        }else if(e.t === "h"){
            CONTENT += `<a class="bc-header">${e.c}</a>`;
        }
    });
    fs.writeFileSync("./index/assetdepends.json", JSON.stringify(ASSETDEPENDS));
    final = final.replace("__CONTENT__", CONTENT);
    //CONTENT END
    fs.writeFileSync(`./html/blog/post/${URL}.html`, final);
    //ADD TO BLOGS
    if (ifnew) {
        console.log("writing the new blog...");
        let blogs = JSON.parse(fs.readFileSync("./index/blogs.json"));
        blogs.unshift({
            title: TITLE,
            url: URL,
            date: DATE,
            sum: SUM
        });
        fs.writeFileSync("./index/blogs.json", JSON.stringify(blogs));
        fs.writeFileSync(`./blog/${URL}.json`, JSON.stringify(blog));
    }
    //REGENERATING INDEX
    if (ifnew) {
        console.log("regenerating blog index...")
        blogindex_gen.generate();
        console.log("DONE")
    }
}