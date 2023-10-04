
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";

interface DatosConfirmacion {
    email: string,
    name: string
};

export const ConfirmacionCorreo = async (datos: DatosConfirmacion) => {

    try {

        const confirmacion = await axios.post('/api/confirmacion', datos);

        if (confirmacion.data.pass) {

            const result = await Swal.fire({
                title: 'Ingrese el código',
                input: 'text',
                inputPlaceholder: 'ingrese el código...',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value || value !== confirmacion.data.pass) {
                        return 'Código incorrecto'
                    }
                }
            });

            if (result.isConfirmed) {
                await Swal.fire({
                    title: 'Email confirmado',
                    timer: 2000,
                    showConfirmButton: false
                });
                return true;
            };

        };

    } catch (error) {

        console.log(error);
        return error;

    };

};
