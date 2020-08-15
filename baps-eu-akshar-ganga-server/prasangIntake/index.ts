import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MyDBHandler } from "./db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    if (req.method !== 'POST') {
        // context.res = { status: 405, body: "Method error"};
        context.res.status(405).send(JSON.stringify('Method error'));
    } else {
        context.log(req.body);
        try {
            const dbHandler = new MyDBHandler();
            await dbHandler.init();
            await dbHandler.addPrasang(req.body);

        } catch (error) {
            console.log(error);
        }
        context.res.status(200).send(JSON.stringify("Data submitted successfully"));
    }
};

export default httpTrigger;
