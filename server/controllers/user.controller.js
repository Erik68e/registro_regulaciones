const User = require('../models/user');
const bcrypt = require('bcrypt');

const userController = {};

userController.registerUser = async (req, res) => {
    try {
        const { usuario, email, password } = req.body;

        // Verificar el dominio del correo
        if (!email.endsWith('@ups.edu.ec')) {
            return res.status(400).json({ success: false, message: 'El correo debe ser de dominio ups.edu.ec' });
        }

        // Verificar la longitud mínima de la clave
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'La clave debe tener al menos 6 caracteres' });
        }

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario con role 'administrador' por defecto
        const newUser = new User({ usuario, email, password });

        // Hash de la contraseña antes de guardarla en la base de datos
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedPassword;

        // Guardar el usuario en la base de datos
        await newUser.save();

        // Si llegamos aquí, el registro fue exitoso
        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};


// Modifica el controlador de inicio de sesión para que devuelva el tipo de usuario junto con la respuesta
userController.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario en la base de datos por el correo electrónico
        const user = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        // Obtener el tipo de usuario
        const userType = user.role; // Suponiendo que el tipo de usuario está almacenado en el campo "role"

        // Si llegamos aquí, el inicio de sesión fue exitoso
        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', userType });
    } catch (error) {
        console.error('Error al iniciar sesión', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

// Método para obtener todos los usuarios
userController.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

// Método para obtener un usuario por su ID
userController.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario por ID', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

// Método para actualizar un usuario por su ID
userController.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;

        // Verificar si el usuario existe
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Actualizar cada campo individualmente
        if (newData.usuario) {
            existingUser.usuario = newData.usuario;
        }
        if (newData.email) {
            existingUser.email = newData.email;
        }

        if (newData.password) {
            existingUser.password = newData.password;
        }

        if (newData.role) {
            existingUser.role = newData.role;
        }

        // Guardar los cambios
        await existingUser.save();

        res.status(200).json({ success: true, message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar usuario', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

// Método para eliminar un usuario por su ID
userController.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el usuario existe
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Eliminar el usuario
        await User.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

userController.actualizarContrasena = async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        // Buscar al usuario en la base de datos por su ID
        const user = await User.findById(userId);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña anterior coincide
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'La contraseña anterior es incorrecta' });
        }

        // Encriptar la nueva contraseña antes de guardarla en la base de datos
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        console.log('Contraseña nueva encriptada:', hashedNewPassword); // Agregar registro de depuración

        // Actualizar la contraseña del usuario
        user.password = hashedNewPassword;

        // Guardar los cambios en la base de datos
        await user.save();

        res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la contraseña', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};


module.exports = userController;