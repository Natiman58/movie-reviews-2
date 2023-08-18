import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeId = (e) => {
        const id = e.target.value;
        setId(id);
    };

    const login = () => {
        props.login({name: name, id: id})
        navigate("/")
    };

    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh'}}>
            <Form>
                <Form.Group style={{width: '300px'}}>
                    <Form.Label style={{marginLeft: '10px'}}>
                        Username
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter userName"
                        value={name}
                        onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{marginLeft: "10px"}}>ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter id"
                        value={id}
                        onChange={onChangeId}
                    />
                </Form.Group>

                <Button variant="primary" onClick={login} style={{marginTop:"15px"}}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;