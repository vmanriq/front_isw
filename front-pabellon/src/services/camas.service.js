import { api } from '../helpers';



function getAllCamas(estado, idpabellon) {
	console.log(estado, idpabellon)
	if (estado == null)
		return api.get(`CamasEstadoPabellon?idpabellon=${idpabellon}`)
	else
		return api.get(`CamasEstadoPabellon?estado=${estado}&idpabellon=${idpabellon}`)
}

function getAllIds() {
	return api.get(`PabellonIds`)
}

const camasService = {
	getAllCamas,
	getAllIds,
};

export default camasService;