import React, { Component } from 'react'

import TechItem from './TechItem'

class TechList extends Component {
    state = {
        newTech: '',
        techs: []
    };

    // executado assim que o component aparece em tela
    componentDidMount() {
        const techs = localStorage.getItem('techs')

        if (techs) {
            this.setState({ techs: JSON.parse(techs) })
        }
    }

    // executado sempre que houver alterações nas props ou estado
    componentDidUpdate(_, prevState) {
        // recebe como parametro prevProps, prevState, se não for usar coloca _
        // this.props, this.state

        if (prevState.techs !== this.state.techs) {
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    // executado quando o component deixa de existir
    componentWillUnmount() {

    }

    handleInputChange = e => {
        this.setState({ newTech: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()

        this.setState({ techs: [...this.state.techs, this.state.newTech], newTech: '' })
        console.log(this.state.newTech)
    }

    handleDelete = (tech) => {
        this.setState({ techs: [...this.state.techs.filter(x => x !== tech)] })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ul>
                    {
                        this.state.techs.map(tech => (
                            <TechItem 
                                key={tech} 
                                tech={tech} 
                                onDelete={() => this.handleDelete(tech)} />
                        ))
                    }
                </ul>
                <input 
                    type="text" 
                    onChange={this.handleInputChange} 
                    value={this.state.newTech} 
                />
                <button type="submit">Enviar</button>
            </form>
        )
    }
}

export default TechList