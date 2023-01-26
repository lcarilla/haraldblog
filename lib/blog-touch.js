const fs = require("fs");
exports.touch = () => {
    const directory = "./new"
    fs.readdirSync(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlinkSync(`${directory}/${file}`, (err) => {
            if (err) throw err;
            });
        }
        });
    fs.copyFileSync("./gen/blog.json", "./new/blog.json");
}
