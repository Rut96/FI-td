import './SearchBar.css'

export function SearchBar({searchTasks}){

    function handleSearch(e){
        const searchValue = e.target.value;
        searchTasks(searchValue);
    }

    return(
        <div className="SearchBar">
            <input 
                type="text" 
                placeholder='Search task' 
                onChange={handleSearch}   
            />
        </div>
    )
}