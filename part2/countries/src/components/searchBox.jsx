const SearchBox = ({ searchName, setSearchName }) => {
    return (
        <input value={searchName} placeholder="Search..." onChange={(e) => setSearchName(e.target.value)}>
        </input>
    )
}

export default SearchBox