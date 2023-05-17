import { Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setSearch } from "../../../store/reducers/lobbyListReducer";

import "./Search.css";

function Search(props) {
    const dispath = useDispatch();
    const search = useSelector(state => state.lobbyList.search);

    return (
        <Form method="get" action="/lobbies/" className="search">
            <input className="value" type="search" name="search" placeholder="Search ..." value={search} 
                onChange={(e) => dispath(setSearch(e.target.value))}
            />
            <input className="button" type="submit" value="Search" disabled={props.isProcessing}/>
        </Form>
    );
};

export default Search;