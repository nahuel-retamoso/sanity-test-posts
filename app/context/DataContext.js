'use client'

import { createContext, useEffect, useState } from "react"
import Client from "../sanityClient";

export const dataContext = createContext()

const client = Client();

export default function DataProvider({ children }) {


    const [tagSelection, setTagSelection] = useState('')
    const [tags, setTags] = useState([])
    const [data, setData] = useState([])
    const [sections, setSections] = useState([])
    const [post, setPost] = useState([])


    async function getData(id) {
        const data = await client.fetch(`*[_type == "post" && section._ref == "${id}"]`);
        setData(data)
        console.log(data)
    }

    async function getTags(array) {
        const refSet = new Set();

        array.forEach(item => {
            if (item.tags && item.tags._ref) {
                refSet.add(item.tags._ref);
            }
        });

        const tagsRef = [...refSet];
        const tagsDataPromises = tagsRef.map(tag => {
            return client.fetch(`*[_type == "tag" && _id == "${tag}"]`);
        });
        const tagsData = await Promise.all(tagsDataPromises);
        setTags(tagsData.flat());
    }

    async function getSections() {
        const sections = await client.fetch(`*[_type == "section"]`);
        setSections(sections)
        console.log(sections)
    }

    function filterByTagRef(array, tagRefId) {
        const filter = array.filter(item => item.tags && item.tags._ref === tagRefId);
        setData(filter)
    }

    async function fetchById(id) {
        const data = await client.fetch(`*[_type == "post" && _id == "${id}"]`);
        console.log(data)
        setPost(data)
    }

    useEffect(() => {
        getTags(data)
        console.log(tags)
    }, [data])

    useEffect(() => {
        filterByTagRef(data, tagSelection)
        console.log(tagSelection)
    }, [tagSelection])

    return (
        <dataContext.Provider value={{ data, getSections, sections, setTagSelection, getData, tags, fetchById, post }}>
            {children}
        </dataContext.Provider>
    )
}
