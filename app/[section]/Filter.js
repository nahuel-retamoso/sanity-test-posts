'use client'
import { useContext } from "react"
import { dataContext } from "../context/DataContext"

export default function Filter() {

    const { tags, setTagSelection } = useContext(dataContext)

return (
    <div className="w-full h-20 bg-green-200 flex items-center justify-center gap-10 text-black/70">
        {tags.map((tag, index) => {
            return (
                <button onClick={() => setTagSelection(tag._id)} key={index}>
                    <h3>{tag.tag}</h3>
                </button>
            )
        })}
    </div>
)
}