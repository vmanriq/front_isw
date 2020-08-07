import { api } from '../helpers';



function getAllCamas(estado, idpabellon) {
	console.log(estado, idpabellon);
	if (estado == null) {
		if (idpabellon == null) {
			//idpabellon = 2;
			//return api.get(`CamasEstadoPabellon?idpabellon=${idpabellon}`);
			return api.get(`CamasEstadoPabellon`);
		} else {
			return api.get(`CamasEstadoPabellon?idpabellon=${idpabellon}`);
		}
	} else {
		if (idpabellon == null) {
			return api.get(`CamasEstado?estado=${estado}`);
		} else {
			return api.get(`CamasEstadoPabellon?estado=${estado}&idpabellon=${idpabellon}`);
		}
	}
}

function getAllIds() {
	return api.get(`PabellonIds`)
}

function updateCama(idcama) {
	let response = api.put(`UpdateCamaState?idCama=${idcama}`);
	console.log(response);
}

const camasService = {
	getAllCamas,
	getAllIds,
	updateCama
};

export default camasService;