import { api } from '../helpers';


function postPabellon(capacidad_) {
    api.post("addPabellon", { capacidad: capacidad_ },
        { crossDomain: true }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    //return api.post('addPabellon', { capacidad: capacidad_ });
}

const pabellonService = {
    postPabellon
};


export default pabellonService;