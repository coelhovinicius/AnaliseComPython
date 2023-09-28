import { server } from "./server.js"

// Constante para recuperar o formulário para observar se há algum evendo de submit e capturá-lo
const form = document.querySelector("#form") // Recupera o id "form" do "index.html"
const input = document.querySelector("#url") // Recupera o valor do id "url" que o usuário forneceu e o atribui à constante "input"
const content = document.querySelector("#content")

// Ouve o form aguardando o submit assíncrono
form.addEventListener("submit", async (event) => {
  event.preventDefault() // Garante que a página não seja automaticamente recarregada após o submit
  content.classList.add("placeholder")

  const videoURL = input.value // Captura o valor da constante "input" e atribui à constante "videoURL"
  //console.log("URL DO VÍDEO: ", videoURL) // Exibe no console

  // Condição IF para verificar se não há a palavra "shorts" incluída à URL fornecida pelo usuário
  if (!videoURL.includes("shorts")) {
    //console.log("NÃO É UM SHORT!")
    // Exibe no console - o "return" serve para interromper a execução da condição
    return (content.textContent = "ESSE VÍDEO NÃO PARECE SER UM SHORT!")
  }

  // Selecionar só o ID do vídeo - Utiliza o "/shorts" como parâmetro para separar o texto fornecido
  const [_, params] = videoURL.split("/shorts/") // O Underline omite a posição no array
  const [videoID] = params.split("?si") // Separa o ID necessário do restante do texto e atribui a uma array

  //console.log(videoId)
  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID) // Função assíncrona

  content.textContent = "Realizando o resumo..."

  //content.textContent = transcription.data.result // Retorna os resultados da pasta "data" da biblioteca do Axios

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  //content.textContent = transcription.data.result
  content.classList.remove("placeholder")
})
