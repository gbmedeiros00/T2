import React, { Component, ChangeEvent, FormEvent } from "react";

type Props = {
    pet?: {
        nome: string;
        tipo: string;
        raca: string;
        genero: string;
    };
    onSubmit: (pet: { nome: string; tipo: string; raca: string; genero: string }) => void;
    onCancel: () => void;
};

type State = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

export default class FormCadastroPets extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.pet?.nome || "",
            tipo: props.pet?.tipo || "",
            raca: props.pet?.raca || "",
            genero: props.pet?.genero || "",
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    render() {
        const { nome, tipo, raca, genero } = this.state;
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
                    <label className="form-label">Tipo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tipo"
                        value={tipo}
                        onChange={this.handleChange}
                        required
                        placeholder="Ex: Cachorro, Gato"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Raça</label>
                    <input
                        type="text"
                        className="form-control"
                        name="raca"
                        value={raca}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gênero</label>
                    <select
                        className="form-select"
                        name="genero"
                        value={genero}
                        onChange={this.handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                    </select>
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