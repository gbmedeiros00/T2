import { Component } from "react";
import FormCadastroServico from "./formCadastroServico";

type Servico = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
};

type Props = {
    tema: string;
};

type State = {
    servicos: Servico[];
    modalAberto: boolean;
    servicoEditando?: Servico | null;
};

export default class ListaServicos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicos: [
                {
                    id: 1,
                    nome: "Banho",
                    preco: 50.00,
                    descricao: "Banho completo para pets de todos os portes."
                },
                {
                    id: 2,
                    nome: "Tosa",
                    preco: 70.00,
                    descricao: "Tosa higiênica e estilizada para cães e gatos."
                }
            ],
            modalAberto: false,
            servicoEditando: null,
        };
    }

    abrirModalNovo = () => {
        this.setState({ modalAberto: true, servicoEditando: null });
    };

    abrirModalEditar = (servico: Servico) => {
        this.setState({ modalAberto: true, servicoEditando: servico });
    };

    fecharModal = () => {
        this.setState({ modalAberto: false, servicoEditando: null });
    };

    excluirServico = (id: number) => {
        this.setState(prev => ({
            servicos: prev.servicos.filter(s => s.id !== id)
        }));
    };

    handleSubmitServico = (dados: { nome: string; preco: number; descricao: string }) => {
        const { servicoEditando, servicos } = this.state;
        if (servicoEditando) {
            this.setState({
                servicos: servicos.map(s =>
                    s.id === servicoEditando.id
                        ? { ...s, ...dados }
                        : s
                ),
                modalAberto: false,
                servicoEditando: null,
            });
        } else {
            const novoServico: Servico = {
                id: servicos.length > 0 ? Math.max(...servicos.map(s => s.id)) + 1 : 1,
                nome: dados.nome,
                preco: dados.preco,
                descricao: dados.descricao,
            };
            this.setState({
                servicos: [...servicos, novoServico],
                modalAberto: false,
                servicoEditando: null,
            });
        }
    };

    render() {
        const { tema } = this.props;
        const { servicos, modalAberto, servicoEditando } = this.state;

        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Serviços</h2>
                    <button className="btn btn-primary" onClick={this.abrirModalNovo}>
                        Novo Serviço
                    </button>
                </div>
                <ul className="list-group">
                    {servicos.map(servico => (
                        <li
                            key={servico.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={servico.id === 4 ? { backgroundColor: tema } : {}}
                        >
                            <span>
                                <strong>{servico.nome}</strong> - R$ {servico.preco.toFixed(2)}
                                <br />
                                <small>{servico.descricao}</small>
                            </span>
                            <div>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => this.abrirModalEditar(servico)}
                                >
                                    Atualizar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => this.excluirServico(servico.id)}
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
                                        {servicoEditando ? "Atualizar Serviço" : "Novo Serviço"}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={this.fecharModal}></button>
                                </div>
                                <div className="modal-body">
                                    <FormCadastroServico
                                        servico={servicoEditando ? {
                                            nome: servicoEditando.nome,
                                            preco: servicoEditando.preco,
                                            descricao: servicoEditando.descricao,
                                        } : undefined}
                                        onSubmit={this.handleSubmitServico}
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