import "./Search.css";

function Search(props) {

    return (
        <form autoComplete="off" className="search">
            <input className="value" type="search" name="title" placeholder="Lobby search ..."/>
            <input className="button" type="submit" value="Search" />
        </form>
    );
};

export default Search;