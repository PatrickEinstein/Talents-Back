import fs from "fs";
import { parse } from "csv-parse";
const CsvParser = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(parse({
            comment: "#",
            columns: true,
        }))
            .on("data", (data) => {
            results.push(data);
        })
            .on("error", (err) => {
            console.error(err);
            reject(err);
        })
            .on("end", () => {
            console.log("Parsing complete");
            resolve(results);
        });
    });
};
export default CsvParser;
