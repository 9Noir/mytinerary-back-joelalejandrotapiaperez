import "dotenv/config.js";
import { connect } from "mongoose";
import User from "../User.js";
import { hashSync } from "bcrypt";

const main = async () => {
    try {
        await connect(process.env.MONGO);

        // Obtener todos los usuarios
        const users = await User.find();

        // Hashear las contraseñas y actualizar los usuarios
        for (const user of users) {
            if (user.password) {
                const hashedPassword = hashSync("111111", 10);
                user.password = hashedPassword;
                console.log(user)
                await user.save();
            }
        }

        console.log("Contraseñas hasheadas con éxito.");
    } catch (error) {
        console.error("Error al hashear contraseñas:", error);
    } finally {
        // Cerrar la conexión a la base de datos al finalizar
        await mongoose.connection.close();
    }
};

main();
