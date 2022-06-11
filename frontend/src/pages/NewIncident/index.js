import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewIncident() {
    const [inc_titulo, setInc_titulo] = useState('');
    const [inc_descricao, setInc_descricao] = useState('');
    const [inc_valor, setInc_valor] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ong_id');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            inc_titulo, 
            inc_descricao, 
            inc_valor,    
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            }) 
            
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar o herói para resolver isso.</p>                    
                
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={inc_titulo}
                        onChange={e => setInc_titulo(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={inc_descricao}
                        onChange={e => setInc_descricao(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value={inc_valor}
                        onChange={e => setInc_valor(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>       
    );
}

