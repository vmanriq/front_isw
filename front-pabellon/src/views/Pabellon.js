import React, { Component } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { CardBody } from 'shards-react';
import pabellonService from '../services/pabellon.service';
export default class Pabellon extends Component {
    constructor(props) {
        super(props);
        this.state = { capacidad: '99' };
    }

    handleSubmit = (event) => {
        alert('A form was submitted: ' + this.state.capacidad);

        pabellonService.postPabellon(this.state.capacidad);



        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Card className="mb-40">
                    <CardBody>
                        <Form onSubmit={this.handleSubmit} >

                            <Form.Group controlId="formBasicEmail">

                                <Form.Label>Capcidad</Form.Label>
                                <Form.Control type="text" placeholder="capacidad" name="capacidad" onChange={this.handleChange} value={this.state.value} />
                                <Form.Text className="text-muted">
                                    Ingrese la capacidad maxima de camas en el pabellon
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Agregar
                    </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Container>

        );
    }
}

