import { Component } from "react";
import FormCadastroProduto from "./formCadastroProduto";

type Produto = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    categoria: string;
};

type Props = {
    tema: string;
};

type State = {
    produtos: Produto[];
    modalAberto: boolean;
    produtoEditando?: Produto | null;
};

export default class ListaProdutos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            produtos: [
                {
                    id: 1,
                    nome: "Ração Premium",
                    preco: 120.0,
                    descricao: "Ração para cães adultos de alta qualidade.",
                    categoria: "Alimentação"
                },
                {
                    id: 2,
                    nome: "Shampoo Pet",
                    preco: 35.5,
                    descricao: "Shampoo suave para todos os tipos de pelagem.",
                    categoria: "Higiene"
                }
            ],
            modalAberto: false,
            produtoEditando: null,
        };
    }

    abrirModalNovo = () => {
        this.setState({ modalAberto: true, produtoEditando: null });
    };

    abrirModalEditar = (produto: Produto) => {
        this.setState({ modalAberto: true, produtoEditando: produto });
    };

    fecharModal = () => {
        this.setState({ modalAberto: false, produtoEditando: null });
    };

    excluirProduto = (id: number) => {
        this.setState(prev => ({
            produtos: prev.produtos.filter(p => p.id !== id)
        }));
    };

    handleSubmitProduto = (dados: { nome: string; preco: number; descricao: string; categoria: string }) => {
        const { produtoEditando, produtos } = this.state;
        if (produtoEditando) {
            this.setState({
                produtos: produtos.map(p =>
                    p.id === produtoEditando.id
                        ? { ...p, ...dados }
                        : p
                ),
                modalAberto: false,
                produtoEditando: null,
            });
        } else {
            const novoProduto: Produto = {
                id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
                nome: dados.nome,
                preco: dados.preco,
                descricao: dados.descricao,
                categoria: dados.categoria,
            };
            this.setState({
                produtos: [...produtos, novoProduto],
                modalAberto: false,
                produtoEditando: null,
            });
        }
    };

    render() {
        const { tema } = this.props;
        const { produtos, modalAberto, produtoEditando } = this.state;

        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Produtos</h2>
                    <button className="btn btn-primary" onClick={this.abrirModalNovo}>
                        Novo Produto
                    </button>
                </div>
                <ul className="list-group">
                    {produtos.map(produto => (
                        <li
                            key={produto.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={produto.id === 4 ? { backgroundColor: tema } : {}}
                        >
                            <span>
                                <strong>{produto.nome}</strong> - R$ {produto.preco.toFixed(2)} - {produto.categoria}
                                <br />
                                <small>{produto.descricao}</small>
                            </span>
                            <div>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => this.abrirModalEditar(produto)}
                                >
                                    Atualizar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => this.excluirProduto(produto.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {modalAberto && (
                    <div className="modal show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {produtoEditando ? "Atualizar Produto" : "Novo Produto"}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={this.fecharModal}></button>
                                </div>
                                <div className="modal-body">
                                    <FormCadastroProduto
                                        produto={produtoEditando ? {
                                            nome: produtoEditando.nome,
                                            preco: produtoEditando.preco,
                                            descricao: produtoEditando.descricao,
                                            categoria: produtoEditando.categoria,
                                        } : undefined}
                                        onSubmit={this.handleSubmitProduto}
                                        onCancel={this.fecharModal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}