import axios from "axios";//importar da biblioteca

const api = axios.create({
    baseURL:"https://viacep.com.br/ws/" //URLbase que não muda
});

export default api