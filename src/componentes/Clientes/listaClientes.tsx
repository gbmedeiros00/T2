import { Component } from "react";
import FormCadastroCliente from "./formCadastroCliente";

type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: string;
    rg: string;
    dataCadastro: string;
    email: string;
    telefone: string;
};

type Props = {
    tema: string;
};

type State = {
    clientes: Cliente[];
    modalAberto: boolean;
    clienteEditando?: Cliente | null;
};

export default class ListaCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientes: [
                {
                    id: 1,
                    nome: "Gabriel Calebe",
                    nomeSocial: "Calebe",
                    cpf: "123.456.789-00",
                    rg: "12.345.678-9",
                    dataCadastro: "2024-06-01",
                    email: "c1@email.com",
                    telefone: "1111-1111"
                },
                {
                    id: 2,
                    nome: "Cliente 2",
                    nomeSocial: "Cliente Dois",
                    cpf: "987.654.321-00",
                    rg: "98.765.432-1",
                    dataCadastro: "2024-06-15",
                    email: "c2@email.com",
                    telefone: "2222-2222"
                },
            ],
            modalAberto: false,
            clienteEditando: null,
        };
    }

    abrirModalNovo = () => {
        this.setState({ modalAberto: true, clienteEditando: null });
    };

    abrirModalEditar = (cliente: Cliente) => {
        this.setState({ modalAberto: true, clienteEditando: cliente });
    };

    fecharModal = () => {
        this.setState({ modalAberto: false, clienteEditando: null });
    };

    excluirCliente = (id: number) => {
        this.setState(prev => ({
            clientes: prev.clientes.filter(c => c.id !== id)
        }));
    };

    handleSubmitCliente = (dados: { nome: string; nomeSocial: string; cpf: string; rg: string; dataCadastro: string; email: string; telefone: string }) => {
        const { clienteEditando, clientes } = this.state;
        if (clienteEditando) {
            this.setState({
                clientes: clientes.map(c =>
                    c.id === clienteEditando.id
                        ? { ...c, ...dados }
                        : c
                ),
                modalAberto: false,
                clienteEditando: null,
            });
        } else {
            const novoCliente: Cliente = {
                id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
                nome: dados.nome,
                nomeSocial: dados.nomeSocial,
                cpf: dados.cpf,
                rg: dados.rg,
                dataCadastro: dados.dataCadastro,
                email: dados.email,
                telefone: dados.telefone,
            };
            this.setState({
                clientes: [...clientes, novoCliente],
                modalAberto: false,
                clienteEditando: null,
            });
        }
    };

    render() {
        const { tema } = this.props;
        const { clientes, modalAberto, clienteEditando } = this.state;

        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Clientes</h2>
                    <button className="btn btn-primary" onClick={this.abrirModalNovo}>
                        Novo Cliente
                    </button>
                </div>
                <ul className="list-group">
                    {clientes.map(cliente => (
                        <li
                            key={cliente.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={cliente.id === 4 ? { backgroundColor: tema } : {}}
                        >
                            <span>
                                <strong>{cliente.nome}</strong>
                                {cliente.nomeSocial && <> ({cliente.nomeSocial})</>}
                                {cliente.cpf && <> - CPF: {cliente.cpf}</>}
                                {cliente.rg && <> - RG: {cliente.rg}</>}
                                {cliente.dataCadastro && <> - Cadastro: {cliente.dataCadastro}</>}
                                {cliente.email && <> - {cliente.email}</>}
                                {cliente.telefone && <> - {cliente.telefone}</>}
                            </span>
                            <div>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => this.abrirModalEditar(cliente)}
                                >
                                    Atualizar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => this.excluirCliente(cliente.id)}
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
                                        {clienteEditando ? "Atualizar Cliente" : "Novo Cliente"}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={this.fecharModal}></button>
                                </div>
                                <div className="modal-body">
                                    <FormCadastroCliente
                                        cliente={clienteEditando ? {
                                            nome: clienteEditando.nome,
                                            nomeSocial: clienteEditando.nomeSocial,
                                            cpf: clienteEditando.cpf,
                                            rg: clienteEditando.rg,
                                            dataCadastro: clienteEditando.dataCadastro,
                                            email: clienteEditando.email,
                                            telefone: clienteEditando.telefone,
                                        } : undefined}
                                        onSubmit={this.handleSubmitCliente}
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