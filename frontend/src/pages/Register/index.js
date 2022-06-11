import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';
//import { useState } from 'react';

export default function Register() {
    const [ong_nome, setOng_nome] = useState('');
    const [ong_email, setOng_email] = useState('');
    const [ong_whatsapp, setOng_whatsapp] = useState('');
    const [ong_cidade, setOng_cidade] = useState('');
    const [ong_uf, setOng_uf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            ong_nome, 
            ong_email, 
            ong_whatsapp, 
            ong_cidade, 
            ong_uf
        };

        try {
            const response = await api.post('ongs', data);    

            alert("Seu ID de acesso: " + response.data.ong_id);

            history.push('/');
        } catch (err) {
            alert("Erro no cadastro, tente novamente.");
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>                    
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={ong_nome} 
                        onChange={e => setOng_nome(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={ong_email} 
                        onChange={e => setOng_email(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp" 
                        value={ong_whatsapp} 
                        onChange={e => setOng_whatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={ong_cidade} 
                            onChange={e => setOng_cidade(e.target.value)}    
                        />
                        <input 
                            placeholder="UF" style={{ width: 80}} 
                            value={ong_uf} 
                            onChange={e => setOng_uf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

