import { createClient } from "next-sanity";

export default function Client() {
    return  createClient({
        projectId: "pvqgw570",
        dataset: "production",
        apiVersion: "2023-07-20",
        useCdn: false
    });
}