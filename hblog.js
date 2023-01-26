const blogpost_gen = require("./lib/blogpost-gen");
const blogpost_rem = require("./lib/blogpost-remove");
const blog_reset = require("./lib/blogreset");
const blog_gen_all = require("./lib/blogpost-gen-all");
const blog_touch = require("./lib/blog-touch");
const blog_cli = require("./lib/blog-cli");
let args = process.argv.slice(2);
if(args[0]==="new"){
    blogpost_gen.generate("./new/blog.json", true);
}else if(args[0]==="regen"){
    blog_gen_all.generate();
}else if(args[0]==="rm"){
    const url = args[1];
    blogpost_rem.remove(url);
}else if(args[0]==="reset"){
    blog_reset.reset();
}else if(args[0]==="touch"){
    blog_touch.touch();
}else if(args[0]==="new-cli"){
    blog_cli.generate();
}else{
    console.log("Command not found");
    console.log("new - generate new blog from the new folder");
    console.log("regen - regenerate all content");
    console.log("rm [url] - remove a blog post");
    console.log("touch - create a new template blog in the new folder");
    console.log("new-cli - write you blog in a command line interface");
    console.log("reset - delete all your blogs");
}