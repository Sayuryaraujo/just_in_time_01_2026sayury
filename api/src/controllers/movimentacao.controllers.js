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
        const { produtoId, usuarioId, tipo, quantidade, data } = req.body;

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

        if (tipo === 'SAIDA' && produto.estoque < quantidade) {
            return res.status(400).json({
                erro: 'Estoque insuficiente'
            });
        }

        const movimentacao = await prisma.$transaction(async (tx) => {
            const novaMovimentacao = await tx.movimentacao.create({
                data: {
                    produtoId,
                    usuarioId,
                    tipo,
                    quantidade,
                    data: data ? new Date(data) : new Date()
                }
            });

            await tx.produto.update({
                where: {
                    id: produtoId
                },
                data: {
                    estoque: tipo === 'ENTRADA'
                        ? { increment: quantidade }
                        : { decrement: quantidade }
                }
            });

            return novaMovimentacao;
        });

        const novoEstoque = tipo === 'ENTRADA'
            ? produto.estoque + quantidade
            : produto.estoque - quantidade;

        res.status(201).json({
            mensagem: 'Movimentação registrada com sucesso',
            movimentacao,
            estoque: novoEstoque,
            estoqueBaixo: novoEstoque < produto.estoqueMinimo
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao registrar movimentação'
        });
    }
};

const listar = async (req, res) => {
    try {
        const movimentacoes = await prisma.movimentacao.findMany({
            include: {
                produto: true,
                usuario: true
            },
            orderBy: {
                id: 'asc'
            }
        });

        res.status(200).json(movimentacoes);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao listar movimentações'
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

        const movimentacao = await prisma.movimentacao.findUnique({
            where: {
                id
            },
            include: {
                produto: true,
                usuario: true
            }
        });

        if (!movimentacao) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        res.status(200).json(movimentacao);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao buscar movimentação'
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { produtoId, usuarioId, tipo, quantidade, data } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const movimentacao = await prisma.movimentacao.findUnique({
            where: {
                id
            }
        });

        if (!movimentacao) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        const movimentacaoAtualizada = await prisma.movimentacao.update({
            where: {
                id
            },
            data: {
                ...(produtoId !== undefined && { produtoId }),
                ...(usuarioId !== undefined && { usuarioId }),
                ...(tipo !== undefined && { tipo }),
                ...(quantidade !== undefined && { quantidade }),
                ...(data !== undefined && {
                    data: new Date(data)
                })
            }
        });

        res.status(200).json({
            mensagem: 'Movimentação atualizada com sucesso',
            movimentacao: movimentacaoAtualizada
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao atualizar movimentação'
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

        const movimentacao = await prisma.movimentacao.findUnique({
            where: {
                id
            }
        });

        if (!movimentacao) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        await prisma.movimentacao.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            mensagem: 'Movimentação excluída com sucesso'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: 'Erro ao excluir movimentação'
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