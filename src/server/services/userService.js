import User from '../entities/user.js';
import bcrypt from 'bcryptjs';

export async function getAllUsers() {
    return await User.findAll();
}

export async function getUserById(id) {
    return await User.findByPk(id);
}

export async function createUser(userData) {
    const { nome, email, senha } = userData;
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
        throw new Error('Este email já está cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await User.create({
        nome: nome,
        email: email,
        senha: hashedPassword
    });

    return newUser;
}

export async function updateUser(id, userData) {
    const user = await User.findByPk(id);
    const existingUserWithEmail = await User.findOne({ where: { email: userData.email } });

    if (userData.id) {
        delete userData.id;
    }

    if (userData.data_criacao) {
        delete userData.data_criacao;
    }

    if (existingUserWithEmail && existingUserWithEmail.id !== id) {
        throw new Error('Este email já está cadastrado.');
    }

    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    if (userData.senha) {
        userData.senha = await bcrypt.hash(userData.senha, 10);
    }

    return await user.update(userData);
}

export async function deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
        return null;
    }
    await user.destroy();
    return user;
}