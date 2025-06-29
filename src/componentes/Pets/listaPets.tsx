import { Component } from "react";
import FormCadastroPets from "./formCadastroPets";

type Pet = {
    id: number;
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

type Props = {
    tema: string;
};

type State = {
    pets: Pet[];
    modalAberto: boolean;
    petEditando?: Pet | null;
};

export default class ListaPets extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pets: [
                {
                    id: 1,
                    nome: "Rex",
                    tipo: "Cachorro",
                    raca: "Labrador",
                    genero: "Macho"
                },
                {
                    id: 2,
                    nome: "Mimi",
                    tipo: "Gato",
                    raca: "Siamês",
                    genero: "Fêmea"
                }
            ],
            modalAberto: false,
            petEditando: null,
        };
    }

    abrirModalNovo = () => {
        this.setState({ modalAberto: true, petEditando: null });
    };

    abrirModalEditar = (pet: Pet) => {
        this.setState({ modalAberto: true, petEditando: pet });
    };

    fecharModal = () => {
        this.setState({ modalAberto: false, petEditando: null });
    };

    excluirPet = (id: number) => {
        this.setState(prev => ({
            pets: prev.pets.filter(p => p.id !== id)
        }));
    };

    handleSubmitPet = (dados: { nome: string; tipo: string; raca: string; genero: string }) => {
        const { petEditando, pets } = this.state;
        if (petEditando) {
            this.setState({
                pets: pets.map(p =>
                    p.id === petEditando.id
                        ? { ...p, ...dados }
                        : p
                ),
                modalAberto: false,
                petEditando: null,
            });
        } else {
            const novoPet: Pet = {
                id: pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1,
                nome: dados.nome,
                tipo: dados.tipo,
                raca: dados.raca,
                genero: dados.genero,
            };
            this.setState({
                pets: [...pets, novoPet],
                modalAberto: false,
                petEditando: null,
            });
        }
    };

    render() {
        const { tema } = this.props;
        const { pets, modalAberto, petEditando } = this.state;

        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Pets</h2>
                    <button className="btn btn-primary" onClick={this.abrirModalNovo}>
                        Novo Pet
                    </button>
                </div>
                <ul className="list-group">
                    {pets.map(pet => (
                        <li
                            key={pet.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={pet.id === 4 ? { backgroundColor: tema } : {}}
                        >
                            <span>
                                <strong>{pet.nome}</strong> - Tipo: {pet.tipo} - Raça: {pet.raca} - Gênero: {pet.genero}
                            </span>
                            <div>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() => this.abrirModalEditar(pet)}
                                >
                                    Atualizar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => this.excluirPet(pet.id)}
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
                                        {petEditando ? "Atualizar Pet" : "Novo Pet"}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={this.fecharModal}></button>
                                </div>
                                <div className="modal-body">
                                    <FormCadastroPets
                                        pet={petEditando ? {
                                            nome: petEditando.nome,
                                            tipo: petEditando.tipo,
                                            raca: petEditando.raca,
                                            genero: petEditando.genero,
                                        } : undefined}
                                        onSubmit={this.handleSubmitPet}
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