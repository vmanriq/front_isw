import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import camasService from '../services/camas.service';
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

class Tables extends Component {

	constructor(props) {
		super(props);
		this.state = {
			camas: [],
			estado: null,
			pabellones: [],
			pabellonid: null,
			id_cama_select: null,
			isOpen: false,
			liberado: 0,

		}

	}

	openModal = () => { this.setState({ ...this.state, isOpen: true }) }
	closeModal = () => { this.setState({ ...this.state, isOpen: false }) }

	//Para extraer las camas, en el servicio se deberia crear uno para filtrar por pabellon
	//Este es el primero que se carga asi que parte con el All y por default las no ocupadas
	componentDidMount() {
		camasService.getAllCamas(this.state.estado, this.state.pabellonid)
			.then((response) => {
				camasService.getAllIds()
					.then((response) => {
						this.setState({
							...this.state,
							pabellones: response.data,
						})
						console.log("pabellones", this.state.pabellones);
					})

				this.setState({
					...this.state,
					camas: response.data,
				})

				console.log("camas", this.state.camas);
				console.log("estado", this.state.estado);

			})
	}
	checkPaciente = () => {
		let id = document.getElementById("id_paciente").value;
		if (id) {
			axios.get("http://iswayudantia02072020.herokuapp.com/pacientes/" + id).then(response => {
				console.log(response.status);
				this.closeModal();
				console.log(this.state);
				//console.log(" id cama select ", this.state.id_cama_select);
				camasService.updateCama(this.state.id_cama_select);
				this.setState({
					...this.state,
					liberado: this.state.liberado + 2,
				});
				alert("Cama asignada correctamente");

			}).catch((error) => {
				console.error("Error - " + error);
				alert("No existe un paciente con este id");
			});
		}
		else {
			alert("Debe ingresar un id ");
		}
	}
	//Para extraer las camas, en el servicio se deberia crear uno para filtrar por pabellon
	//En este abria que crear un if que use el getAll o el por pabellon
	componentDidUpdate(prevProps, prevState) {
		if ((prevState.estado !== this.state.estado) || (prevState.pabellonid !== this.state.pabellonid) || (prevState.liberado !== this.state.liberado)) {
			camasService.getAllCamas(this.state.estado, this.state.pabellonid)
				.then((response) => {
					this.setState({
						...this.state,
						camas: response.data,
					})
					console.log("camas", this.state.camas);
					console.log("estado", this.state.estado);
					console.log("esta3", this.state.liberado);
					console.log("id", this.state.id_cama_select);
				})
		}
	}







	render() {


		const buttonCama = (state, id) => {
			if (state === 'Si') {
				console.log(id);
				camasService.updateCama(id);

				document.getElementById("cama_" + id).classList.remove('btn-danger');
				document.getElementById("cama_" + id).classList.add('btn-info');
				document.getElementById("cama_" + id).innerHTML = "asignar";

				this.setState({
					...this.state,
					liberado: this.state.liberado + 2,
					id_cama_select: id,
				})
				this.setState({
					...this.state,
					liberado: this.state.liberado + 2,
					id_cama_select: id,
				})

			}
			else {
				this.setState({
					...this.state,
					liberado: this.state.liberado + 2,
					id_cama_select: id,
					isOpen: true
				})
				this.setState({
					...this.state,
					liberado: this.state.liberado + 2,
					id_cama_select: id,
					isOpen: true
				})
				//aux = this.openModal;
				//return this.openModal();
			}
			//return aux;
		}

		const camas = this.state.camas;
		//La parte que alimenta la tabla segun el json obtenido
		const renderCama = (cama, index) => {
			var est, dis, text;
			//Por alguna razon el false no se muestra en la tabla asi que lo pase a si o no
			if (cama.ocupado === false) {
				est = 'No';
				dis = "btn btn-sm btn-info";
				text = "asginar"
			}
			else {
				est = 'Si';
				dis = "btn btn-sm  btn-danger";
				text = "liberar";
			}
			return (
				<tr key={index} className="text-center">
					<td>{cama.camaid}</td>
					<td>{cama.idpabellon}</td>
					<td>{est}</td>
					<td>{cama.capacidad}</td>
					<td> <Button id={"cama_" + cama.camaid} className={dis} onClick={() => buttonCama(est, cama.camaid)}> {text} </Button></td>
				</tr >
			)
		}

		return (


			//La tabla hay que añadirle los dropdowns de estado y pabellon
			<Container fluid className="main-content-container px-4" >
				<Modal show={this.state.isOpen} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Asignar Cama Paciente</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Control required id="id_paciente" type="number" placeholder="ID" min="0"></Form.Control>
						<Form.Text className="text-muted">
							Ingrese el ID del paciente a asignar
                       </Form.Text>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" className="btn btn-success" onClick={this.checkPaciente}>Asignar</Button>
					</Modal.Footer>
				</Modal>
				{/* Default Light Table */}
				<Row >
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<table>
									<tbody>
										<tr>
											<th scope="col" className="border-0" style={{
												textAlign: "center"
											}}>
												<h6 className="m-0">Listado de Camas</h6>
											</th>
										</tr>
										<tr>
											<th className="text-center">
												<div className="dropdown">
													<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														Pabellon
  </button>
													<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

														<button className="dropdown-item" onClick={() => this.setState({
															...this.state,
															pabellonid: null,
														})}>---</button>

														{this.state.pabellones.map(pab => (
															<button key={pab} className="dropdown-item" onClick={() => this.setState({
																...this.state,
																pabellonid: pab,
															})}>{pab}</button>
														))}

													</div>
												</div>
											</th>
											<th>
												<div className="dropdown">
													<button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														Ocupada
	                        </button>
													<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
														<button className="dropdown-item" onClick={() => this.setState({
															...this.state,
															estado: null,
														})}>--- </button>
														<button className="dropdown-item" onClick={() => this.setState({
															...this.state,
															estado: true,
														})}>Si</button>
														<button className="dropdown-item" onClick={() => this.setState({
															...this.state,
															estado: false,
														})}>No</button>
													</div>
												</div>
											</th>
										</tr>
									</tbody>
								</table>
							</CardHeader>
							<CardBody className="p-0 pb-3">
								<table className="table mb-0">
									<thead className="bg-light">
										<tr>
											<th scope="col" className="border-0 text-center">
												Id Cama
	    	                  				</th>
											<th scope="col" className="border-0 text-center">
												Id Pabellon
	    	                				</th>
											<th scope="col" className="border-0 text-center">
												Ocupado
	    	                  				</th>
											<th scope="col" className="border-0 text-center">
												Capacidad
	    	                  				</th>
											<th scope="col" className="border-0 text-center">
												Acción
	    	                  				</th>
										</tr>
									</thead>
									<tbody>

									</tbody>
								</table>
							</CardBody>
						</Card>
					</Col>
				</Row >
			</Container >
		);
	}
}





export default Tables;
