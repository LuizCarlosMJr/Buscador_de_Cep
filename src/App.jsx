import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {
  //usestate para armazenar o valor do input, que começará vazio
  const[input, setinput] = useState('');

  //criar um useState para armazenar o retorno da chamada, que começará vazio
  const [Cep, setCep] = useState({});

  // Afunção será assíncrona (async) pq será feita uma requisição e pode demorar, dar erro
  async function clicouNoButton(){
   // alert("O valor do Input é: "+ input) =>alert para teste do clique
    if(input === ""){//condição para ver se o input estávazio noato do click
        alert("Preencha o campo!!!")
        return;
    }

    try{//o que vc quer fazer, mas pode dar errado
      const response = await api.get(`${input}/json`);
     // console.log(response.data);
     setCep(response.data);
     setinput('');

    }catch{//Caso dê errado, executa esse bloco (excessões)
      alert('Ops... Erro ao buscar :( Digite novamente!!!');
      setinput('');//volta o valor do input para vazio
    }


  }

  return (
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>

      <div className="containerInput">
          <input 
          type="text" 
          placeholder='Digite o CEP desejado...' 
          value={input} //o valor do input está atrelado ao input
          onChange={(event) => setinput(event.target.value)} //pega tudo foi digitado e passa para o setInput
          />

          <button className="buttonSearch" onClick={clicouNoButton}> 
            <FiSearch size={30} color="#fff" /> 
          </button>
      </div>
        {Object.keys(Cep).length > 1  && (//Quando o tamanho do objeto for maior que zero, mostrará co cunteúdo do main
          <main className="main">
          <h2>CEP: {Cep.cep}</h2>
          <span>Logradouro: {Cep.logradouro}</span>
          <span>Complemento: {Cep.complemento}</span>
          <span>Bairro: {Cep.bairro}</span>
          <span>Cidade:{Cep.localidade} - {Cep.uf}</span>
          <span>DDD: {Cep.ddd}</span>
        </main>

        )}
     
      
    </div>
  )
}

export default App
