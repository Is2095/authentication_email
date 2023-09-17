
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String, // Tipo corregido
    unique: true,
    required: [true, "El Email es requerido"],
    match: [
      /^[a-z0-9._%+-]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
      "Email no es válido"
    ]
  },
  password: {
    type: String,
    required: [true, "El password es requrido"],
    select: false
  },
  name: {
    type: String,
    requered: [true, "El nombre es requerido"],
    minLength: [3, "El nombre requiere más de 3 caracteres"],
    maxLength: [15, "El nombre debe tener menos de 15 caracteres"]
  }
});

export default models.User || model('User', userSchema);

// const User = model('User', userSchema);
// export default User
