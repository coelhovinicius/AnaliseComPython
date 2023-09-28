import axios from "axios" // Biblioteca para conectar o front e backend

export const server = axios.create({
  baseURL: "http://localhost:3333", // URL base
})
