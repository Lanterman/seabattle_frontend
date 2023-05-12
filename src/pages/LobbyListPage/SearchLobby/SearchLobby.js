import "./SearchLobby.css";

function SearchLobby(props) {

    return (
        <form autoComplete="off" className="search">
            <input type="search" name="title" />
            <input type="submit" value="search" />
        </form>
    );
};

export default SearchLobby;