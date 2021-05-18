import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function Form2() {

    return (
        <div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name="form2"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="password" placeholder="Enter email" name="formmmmm"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
        </div >
    )

}