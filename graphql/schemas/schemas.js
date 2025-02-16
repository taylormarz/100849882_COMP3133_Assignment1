const fs = require("fs");
const path = require("path");
const { buildSchema } = require("graphql");

// read graphql files from schemas folder (keeping dynamic)
const schemaFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith(".graphql"))
    .map(file => fs.readFileSync(path.join(__dirname, file), "utf8"));

// merges all schemas inside any graphql file from folder
const schema = buildSchema(schemaFiles.join("\n"));

module.exports = schema;