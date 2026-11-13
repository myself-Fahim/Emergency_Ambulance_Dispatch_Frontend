import { ofetch } from "ofetch";


const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL



const ofetchClient = ofetch.create({
    baseURL,
    credentials:"include"
})

export default ofetchClient