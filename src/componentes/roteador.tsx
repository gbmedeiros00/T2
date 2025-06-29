import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./Clientes/listaClientes";
import ListaPets from "./Pets/listaPets";
import ListaProdutos from "./Produtos/listaProdutos";
import ListaServicos from "./Servicos/listaServicos";
import ListaRelatorios from "./Relatorios/listaRelatorios";
import RegistrarConsumo from "./Consumo/registrarConsumo";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema="#e3f2fd"
                botoes={['Clientes', 'Pets', 'Produtos', 'Serviços', 'Consumo', 'Relatórios']}
            />
        );
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Pets') {
            return (
                <>
                    {barraNavegacao}
                    <ListaPets tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    <ListaProdutos tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <ListaServicos tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Consumo') {
            return (
                <>
                    {barraNavegacao}
                    <RegistrarConsumo tema="#e3f2fd" />
                </>
            )
        } else if (this.state.tela === 'Relatórios') {
            return (
                <>
                    {barraNavegacao}
                    <ListaRelatorios tema="#e3f2fd" />
                </>
            )
        } 
    }
}