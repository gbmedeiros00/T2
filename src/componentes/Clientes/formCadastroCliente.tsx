import React, { Component, ChangeEvent, FormEvent } from "react";

type Props = {
    cliente?: {
        nome: string;
        nomeSocial: string;
        cpf: string;
        rg: string;
        dataCadastro: string;
        email: string;
        telefone: string;
    };
    onSubmit: (cliente: { nome: string; nomeSocial: string; cpf: string; rg: string; dataCadastro: string; email: string; telefone: string }) => void;
    onCancel: () => void;
};

type State = {
    nome: string;
    nomeSocial: string;
    cpf: string;
    rg: string;
    dataCadastro: string;
    email: string;
    telefone: string;
};

export default class FormCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.cliente?.nome || "",
            nomeSocial: props.cliente?.nomeSocial || "",
            cpf: props.cliente?.cpf || "",
            rg: props.cliente?.rg || "",
            dataCadastro: props.cliente?.dataCadastro || "",
            email: props.cliente?.email || "",
            telefone: props.cliente?.telefone || "",
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        const { nome, nomeSocial, cpf, rg, dataCadastro, email, telefone } = this.state;
        const { onCancel } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nome"
                        value={nome}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nome Social</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nomeSocial"
                        value={nomeSocial}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cpf"
                        value={cpf}
                        onChange={this.handleChange}
                        required
                        maxLength={14}
                        placeholder="000.000.000-00"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">RG</label>
                    <input
                        type="text"
                        className="form-control"
                        name="rg"
                        value={rg}
                        onChange={this.handleChange}
                        required
                        maxLength={12}
                        placeholder="00.000.000-0"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Data do Cadastro</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dataCadastro"
                        value={dataCadastro}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        required
                        placeholder="exemplo@email.com"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="telefone"
                        value={telefone}
                        onChange={this.handleChange}
                        required
                        placeholder="(99) 99999-9999"
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Salvar
                    </button>
                </div>
            </form>
        );
    }
}