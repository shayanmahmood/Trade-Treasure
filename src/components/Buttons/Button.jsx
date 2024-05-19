import { Link } from "react-router-dom"

function Button({ path, title }) {
    return (
        <Link
            to={path}
            class="button button--nina px-5 py-0 my-5 bg-green-300 hover:bg-green-400 text-white hover:text-white relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden"
            data-text="Go To"
        >
            {title?.split("").map((title) => {
                return <span class="align-middle" key={Math.random()}>{title}</span>
            })}
        </Link>
    )
}

export default Button
