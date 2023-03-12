const { default: axios } = require('axios');
const fs = require('fs');
const process = require('process');

async function readFile(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}:\n${err}`);
            process.exit(1);
        }

        const lines = data.split(/r?\n/);
        for (let url of lines) {
            if (url.includes("http")) {
                fetchURL(url).then(response => {
                    const out = new URL(url).hostname;
                    writeToFile(response.data, out);
                    console.log(`Wrote to ${out}`);
                },
                error => {
                    console.log(`Couldn't download ${url}`)
                });
            }
        }
    })
}

async function fetchURL(url) {
    try {
        return axios.get(url);
    } catch(err) {
        console.error(`Error fetching ${url}:\n${err}`);
    }
}

function writeToFile(text, out) {
    fs.writeFile(out, text, 'utf-8', function(err) {
        if (err) {
            console.error(`Couldn't write ${out}:\n${err}`);
        }
    })
}

let file = process.argv[2];
if (!file) {
    console.log("Please supply a file.")
    process.exit(1);
}

readFile(file);