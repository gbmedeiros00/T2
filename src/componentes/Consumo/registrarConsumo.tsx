import React, { Component, ChangeEvent, FormEvent } from "react";

type Cliente = {
    id: number;
    nome: string;
};

type Pet = {
    id: number;
    nome: string;
    donoId: number;
};

type Produto = {
    id: number;
    nome: string;
};

type Servico = {
    id: number;
    nome: string;
};

type ItemConsumo = {
    id: number;
    nome: string;
    tipo: "produto" | "servico";
};

type Props = {
    tema: string;
};

type State = {
    clientes: Cliente[];
    pets: Pet[];
    produtos: Produto[];
    servicos: Servico[];
    clienteSelecionado: string;
    petSelecionado: string;
    itemSelecionado: string;
    quantidade: string;
};

export default class RegistrarConsumo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientes: [
                { id: 1, nome: "Gabriel Calebe" },
                { id: 2, nome: "Cliente 2" }
            ],
            pets: [
                { id: 1, nome: "Rex", donoId: 1 },
                { id: 2, nome: "Mimi", donoId: 2 }
            ],
            produtos: [
                { id: 1, nome: "Ração Premium" },
                { id: 2, nome: "Shampoo Pet" }
            ],
            servicos: [
                { id: 1, nome: "Banho" },
                { id: 2, nome: "Tosa" }
            ],
            clienteSelecionado: "",
            petSelecionado: "",
            itemSelecionado: "",
            quantidade: "1"
        };
    }

    handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as any);
        if (name === "clienteSelecionado") {
            this.setState({ petSelecionado: "" });
        }
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { itemSelecionado, produtos, servicos } = this.state;
        const produto = produtos.find(p => p.nome === itemSelecionado);
        const servico = servicos.find(s => s.nome === itemSelecionado);
        const tipo = produto ? "Produto" : "Serviço";

        alert(
            `Consumo registrado:\nCliente: ${this.state.clienteSelecionado}\nPet: ${this.state.petSelecionado}\n${tipo}: ${this.state.itemSelecionado}\nQuantidade: ${this.state.quantidade}`
        );
        this.setState({
            clienteSelecionado: "",
            petSelecionado: "",
            itemSelecionado: "",
            quantidade: "1"
        });
    };

    render() {
        const {
            clientes,
            pets,
            produtos,
            servicos,
            clienteSelecionado,
            petSelecionado,
            itemSelecionado,
            quantidade
        } = this.state;

        const petsFiltrados = clienteSelecionado
            ? pets.filter(p => p.donoId === Number(clienteSelecionado))
            : [];

        const itensConsumo: ItemConsumo[] = [
            ...produtos.map(p => ({ ...p, tipo: "produto" as const })),
            ...servicos.map(s => ({ ...s, tipo: "servico" as const }))
        ];

        return (
            <div className="container mt-4">
                <h2>Registrar Consumo</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Cliente</label>
                        <select
                            className="form-select"
                            name="clienteSelecionado"
                            value={clienteSelecionado}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Selecione o cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Pet</label>
                        <select
                            className="form-select"
                            name="petSelecionado"
                            value={petSelecionado}
                            onChange={this.handleChange}
                            required
                            disabled={!clienteSelecionado}
                        >
                            <option value="">Selecione o pet</option>
                            {petsFiltrados.map(pet => (
                                <option key={pet.id} value={pet.id}>
                                    {pet.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Produto ou Serviço</label>
                        <select
                            className="form-select"
                            name="itemSelecionado"
                            value={itemSelecionado}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Selecione</option>
                            {itensConsumo.map(item => (
                                <option key={item.tipo + item.id} value={item.nome}>
                                    {item.nome} {item.tipo === "produto" ? "(Produto)" : "(Serviço)"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantidade</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantidade"
                            value={quantidade}
                            min="1"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                            Registrar Consumo
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}