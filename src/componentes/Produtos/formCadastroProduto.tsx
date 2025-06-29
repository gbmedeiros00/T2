import React, { Component, ChangeEvent, FormEvent } from "react";

type Props = {
    produto?: {
        nome: string;
        preco: number;
        descricao: string;
        categoria: string;
    };
    onSubmit: (produto: { nome: string; preco: number; descricao: string; categoria: string }) => void;
    onCancel: () => void;
};

type State = {
    nome: string;
    preco: string;
    descricao: string;
    categoria: string;
};

export default class FormCadastroProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.produto?.nome || "",
            preco: props.produto?.preco?.toString() || "",
            descricao: props.produto?.descricao || "",
            categoria: props.produto?.categoria || "",
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        this.props.onSubmit({
            nome: this.state.nome,
            preco: parseFloat(this.state.preco),
            descricao: this.state.descricao,
            categoria: this.state.categoria,
        });
    };

    render() {
        const { nome, preco, descricao, categoria } = this.state;
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
                    <label className="form-label">Preço</label>
                    <input
                        type="number"
                        className="form-control"
                        name="preco"
                        value={preco}
                        onChange={this.handleChange}
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea
                        className="form-control"
                        name="descricao"
                        value={descricao}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <input
                        type="text"
                        className="form-control"
                        name="categoria"
                        value={categoria}
                        onChange={this.handleChange}
                        required
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