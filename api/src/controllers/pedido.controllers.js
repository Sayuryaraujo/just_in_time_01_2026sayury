const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const adapter = new PrismaMariaDb({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_estoque'
});

const prisma = new PrismaClient({ adapter });

const cadastrar = async (req, res) => {
    try {
        const { cliente, data } = req.body;

        if (!cliente) {
            return res.status(400).json({
                erro: 'Cliente é obrigatório'
            });
        }

        const pedido = await prisma.pedido.create({
            data: {
                cliente,
                data: data ? new Date(data) : new Date()
            }
        });

        return res.status(201).json({
            mensagem: 'Pedido cadastrado com sucesso',
            pedido
        });

    } catch (error) {
        console.error('Erro ao cadastrar pedido:', error);

        return res.status(400).json({
            erro: error.message
        });
    }
};

const listar = async (req, res) => {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: {
                itens: true
            },
            orderBy: {
                id: 'asc'
            }
        });

        return res.status(200).json(pedidos);

    } catch (error) {
        console.error('Erro ao listar pedidos:', error);

        return res.status(400).json({
            erro: error.message
        });
    }
};

const buscar = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const pedido = await prisma.pedido.findUnique({
            where: {
                id
            },
            include: {
                itens: true
            }
        });

        if (!pedido) {
            return res.status(404).json({
                erro: 'Pedido não encontrado'
            });
        }

        return res.status(200).json(pedido);

    } catch (error) {
        console.error('Erro ao buscar pedido:', error);

        return res.status(400).json({
            erro: error.message
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { cliente, data } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        if (cliente === undefined && data === undefined) {
            return res.status(400).json({
                erro: 'Informe cliente ou data para atualizar'
            });
        }

        const pedido = await prisma.pedido.findUnique({
            where: {
                id
            }
        });

        if (!pedido) {
            return res.status(404).json({
                erro: 'Pedido não encontrado'
            });
        }

        const pedidoAtualizado = await prisma.pedido.update({
            where: {
                id
            },
            data: {
                ...(cliente !== undefined && {
                    cliente
                }),

                ...(data !== undefined && {
                    data: new Date(data)
                })
            }
        });

        return res.status(200).json({
            mensagem: 'Pedido atualizado com sucesso',
            pedido: pedidoAtualizado
        });

    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);

        return res.status(400).json({
            erro: error.message
        });
    }
};

const excluir = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const pedido = await prisma.pedido.findUnique({
            where: {
                id
            }
        });

        if (!pedido) {
            return res.status(404).json({
                erro: 'Pedido não encontrado'
            });
        }

        await prisma.pedido.delete({
            where: {
                id
            }
        });

        return res.status(200).json({
            mensagem: 'Pedido excluído com sucesso'
        });

    } catch (error) {
        console.error('Erro ao excluir pedido:', error);

        return res.status(400).json({
            erro: error.message
        });
    }
};


module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};