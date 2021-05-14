import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


export default function Forms() {

    return (
        <div>
            <h1>Registro de usuario</h1>
            <Form action="">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

            <Button variant="primary">Primary</Button>{' '}
            </Form>

        </div >
    )

}