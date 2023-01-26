import { Form } from "react-router-dom";


function  CreateLobby(props) {

    return (
        <Form action="/lobbies/new" method="post">
            <label>Title: <input type="text" name="title" /></label>
            <label>Body: <input type="text" name="body" /></label>
            <input type="hidden" name="userId" value="1" />
            <input type="submit" value="Add lobby"/>
        </Form>
    );
};

export default CreateLobby;