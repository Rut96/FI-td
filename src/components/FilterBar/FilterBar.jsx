import './FilterBar.css'

export function FilterBar({ filterTasks }) {

    function handleFilter(e) {
        const filterValue = e.target.value;
        filterTasks(filterValue);
    }

    return (
        <div className="FilterBar">
            <select onChange={handleFilter} defaultValue="all">
                <option value="all">All Tasks</option>
                <option value="done">Completed</option>
                <option value="nDone">Pending</option>
            </select>
        </div>
    );
}