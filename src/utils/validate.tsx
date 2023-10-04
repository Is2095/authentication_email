
import * as yup from 'yup';

export const validationSchema = yup.object({
    email: yup
        .string()
        .trim() // saca espacios en blanco al principio y al final
        .required("El email es requrido")
        .email("El correo no es válido"),
    name: yup
        .string()
        .trim()
        .required("El nombre es requerido")
        .min(2, "El nombre debe tener más de 1 caracteres")
        .max(15, "El nombre no debe contener más de 15 caracteres"),
    motivo: yup
        .string()
        .required("Se requiere un motivo")
        .min(4, "El motivo debe tener más de 3 caracteres")
        .max(10, "El motivo no puede tener más de 10 caracteres"),
    cuerpo: yup
        .string()
        .required("Se requiere este campo")
        .min(5, "El motivo no puede tener menos de 5 caracteres")
        .max(50, "Sólo se pueden ingresar 10 caracteres")
});

export const validationSchemaWhatsapp = yup.object({
    name: yup
        .string()
        .trim()
        .required("El nombre es requerido")
        .min(2, "El nombre debe tener más de 1 caracteres")
        .max(15, "El nombre no debe contener más de 15 caracteres"),
    mensaje: yup
        .string()
        .required("Se requiere este campo")
        .min(5, "El motivo no puede tener menos de 5 caracteres")
        .max(50, "Sólo se pueden ingresar 10 caracteres"),
    numero: yup
        .string()
        .matches(/^(?:(?:\+?54?[-\s]?)?(?:9?[-\s]?)?)?(\d{3})(?:[-\s]?\d{7})$/, "Debe ser un número de teléfono")
        .required("Debe ingresar un número de teléfono")
});
