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
        const { produtoId, usuarioId, quantidade, data } = req.body;

        const produto = await prisma.produto.findUnique({
            where: {
                id: produtoId
            }
        });

        if (!produto) {
            return res.status(404).json({
                erro: 'Produto não encontrado'
            });
        }

        const producao = await prisma.$transaction(async (tx) => {
            const novaProducao = await tx.producao.create({
                data: {
                    produtoId,
                    usuarioId,
                    quantidade,
                    data: data ? new Date(data) : new Date()
                }
            });

            await tx.produto.update({
                where: {
                    id: produtoId
                },
                data: {
                    estoque: {
                        increment: quantidade
                    }
                }
            });

            await tx.movimentacao.create({
                data: {
                    produtoId,
                    usuarioId,
                    tipo: 'ENTRADA',
                    quantidade,
                    data: data ? new Date(data) : new Date()
                }
            });

            return novaProducao;
        });

        res.status(201).json(producao);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao registrar produção'
        });
    }
};

const listar = async (req, res) => {
    try {
        const producoes = await prisma.producao.findMany({
            include: {
                produto: true,
                usuario: true
            },
            orderBy: {
                id: 'asc'
            }
        });

        res.status(200).json(producoes);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao listar produções'
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

        const producao = await prisma.producao.findUnique({
            where: {
                id
            },
            include: {
                produto: true,
                usuario: true
            }
        });

        if (!producao) {
            return res.status(404).json({
                erro: 'Produção não encontrada'
            });
        }

        res.status(200).json(producao);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao buscar produção'
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { produtoId, usuarioId, quantidade, data } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const producao = await prisma.producao.findUnique({
            where: {
                id
            }
        });

        if (!producao) {
            return res.status(404).json({
                erro: 'Produção não encontrada'
            });
        }

        const producaoAtualizada = await prisma.producao.update({
            where: {
                id
            },
            data: {
                ...(produtoId !== undefined && { produtoId }),
                ...(usuarioId !== undefined && { usuarioId }),
                ...(quantidade !== undefined && { quantidade }),
                ...(data !== undefined && { data: new Date(data) })
            }
        });

        res.status(200).json({
            mensagem: 'Produção atualizada com sucesso',
            producao: producaoAtualizada
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao atualizar produção'
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

        const producao = await prisma.producao.findUnique({
            where: {
                id
            }
        });

        if (!producao) {
            return res.status(404).json({
                erro: 'Produção não encontrada'
            });
        }

        await prisma.producao.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            mensagem: 'Produção excluída com sucesso'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao excluir produção'
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