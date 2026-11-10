import { ofetch } from "ofetch";

const ofetchClient = ofetch.create({
    baseURL: process.env.BACKEND_URL
})

export default ofetchClient