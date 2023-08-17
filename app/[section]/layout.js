import Filter from "./Filter";


export default function FilterLayout ({ children }) {

    return (

            <div>
                <Filter/>
                {children}
            </div>

    )
}