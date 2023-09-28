import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav")

export const convert = () =>
  new Promise((resolve, reject) => {
    console.log("Convertendo o vídeo...") // 1h16m50s

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
      .input(filePath) // Arquivo a ser manipulado
      .audioFrequency(16000) // Frequência compreensível para o áudio
      .audioChannels(1) // Audio terá 1 canal
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath)
        const fileDecoded = wav.decode(file)

        const audioData = fileDecoded.channelData[0]
        const floatArray = new Float32Array(audioData)

        console.log("Vídeo convertido com sucesso!")

        resolve(floatArray)
        fs.unlinkSync(outputPath) // Deleta o arquivo após processar
      })
      .on("error", (error) => {
        console.log("Erro ao converter o vídeo", error)
        reject(error)
      })
      .save(outputPath)
  })
