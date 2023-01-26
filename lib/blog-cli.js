const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const blogpost_gen = require("./blogpost-gen");
exports.generate = () => {
    console.log(`HARALDBLOG COMMAND LINE INTERFACE`);
    const TITLE = prompt("blog title: ");
    console.log(TITLE);
    const URL = prompt("blog url: ");
    console.log(URL);
    const SUM = prompt("summarize the posts content in a few words: ");
    console.log(SUM);
    let INTRO = [];
    while (1) {
        const zw = prompt("intro section parts (f if finished, d for delete last): ")
        if (zw === "d") { INTRO.pop(); console.log("deleted") }
        if (zw === "f") { break }
        console.log(zw)
        INTRO.push(zw);
    }
    let CONTENT = [];
    while (1) {
        const t = prompt("blog content type: (f if finished, d for delete last, help for help): ")
        if (t === "help") {
            console.log("Possible content type options:");
            console.log("e - normal blog text element");
            console.log("c - code block");
            console.log("h - blog subheading");
            console.log("img - image (content: image path)");
            console.log("cf - code block from file (content: file path)");
            console.log("NOTE: IF YOU ARE USING ANY FILES, COPY THEM TO THE 'NEW' FOLDER");
            continue
        }
        if (t === "d") { CONTENT.pop(); console.log("deleted"); continue }
        if (t === "f") { break }
        const v = prompt("value: ");
        CONTENT.push({ t: t, c: v });
    }
    const finished = {
        title: TITLE,
        url: URL,
        sum: SUM,
        intro: INTRO,
        content: CONTENT
    }
    while (1) {
        console.log("if you confirm, the blog.json file in the new directory will be overwritten");
        const confirm = prompt("Confirm or abort [y/a]");
        if (confirm === "y") {
            fs.writeFileSync("./new/blog.json", JSON.stringify(finished));
            blogpost_gen.generate("./new/blog.json", true);
            break
        }
    }
}