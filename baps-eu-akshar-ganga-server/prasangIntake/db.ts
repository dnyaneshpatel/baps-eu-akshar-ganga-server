import { CosmosClient } from "@azure/cosmos";

export class MyDBHandler {
    databaseId = "prasangs-db";
    containerId = "prasangs";
    partitionKey = "prasangGranth";
    host = "https://baps-eu-akshar-ganga-prasangs.documents.azure.com:443/";
    primaryKey = "UXO6fMcmFRBHZwNLkuxDe0nDcCnQ1YRCxoaN5JV5vmnrshkkHRDFKsOjoeAKHl29OnwYc9HnhRq2diV69i3d8w==";
    cosmosClient;
    database;
    container;

    constructor() {
        this.cosmosClient = new CosmosClient({
            endpoint: this.host,
            key: this.primaryKey
        });
        this.database = null;
        this.container = null;
        console.log("Created CosmosClient");
    }

    async init() {
        try {
            const dbResponse = await this.cosmosClient.databases.createIfNotExists({ id: this.databaseId });
            this.database = dbResponse.database;
            console.log("Created database");
            const coResponse = await this.database.containers.createIfNotExists({ id: this.containerId });
            this.container = coResponse.container;
            console.log("Created container");
        } catch (err) {
            throw err;
        }
    }

    async addPrasang(prasang) {
        try {
            prasang.date = Date.now();
            // prasang.completed = false;
            const { resource: doc } = await this.container.items.create(prasang);
            return doc;
        } catch (err) {
            throw err;
        } 
    }
}