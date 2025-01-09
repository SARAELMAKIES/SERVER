import { connect } from "mongoose";

export function connectToDb() {
    connect("mongodb+srv://soul6787344:xZnXpbiCWixJmNJG@cluster0.qyvps.mongodb.net/projectshop?retryWrites=true&w=majority&appName=Cluster0")
        .then(con => console.log("mogo Db connected"))
        .catch(err => {
            console.log("cannot connect mongo db", err);
            process.exit(1)
        })
}
