import cors from "cors"
import express from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

/*Constante "app" que irá iniciar o express*/
const app = express()
app.use(express.json())
app.use(cors())

/*Pega o parâmetro de ID e exibe (request, response)*/
app.get("/summary/:id", async (request, response) => {
  try {
    await download(request.params.id) // Chama a função de download - aguarda o Promise
    const audioConverted = await convert()
    //console.log(audioConverted)
    const result = await transcribe(audioConverted)

    return response.json({ result }) // ou ({ result: result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

/*Escuta as requisições / exibe uma frase dentro das aspas*/
app.listen(3333, () => console.log("Server is running on port 3333"))
