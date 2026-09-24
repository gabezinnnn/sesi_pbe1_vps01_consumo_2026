const express = require("express")
const cors = require("cors")
const equipamentos = require("./dados.json")
const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

const lerEquipamentos = (req, res) => {
    res.send(equipamentos)
}

const cadastrarEquipamento = (req, res) => {
    const dados = req.body
    if (req.body) {
        dados.id = Number(equipamentos.length) + 1
        equipamentos.push(dados)
        res.send(dados)
    } else {
        res.status(400).send("ERRO: Dado não digitado.")
    }
}

const atualizarEquipamento = (req, res) => {
    const id = req.params.id
    const dados = req.body
    let status = 0

    equipamentos.forEach((equip) => {
        if (equip.id == id) {
            status = 1
            equip.equipamento = dados.equipamento
            equip.local = dados.local
            equip.consumo_kwh = dados.consumo_kwh
            equip.mes_referencia = dados.mes_referencia
            equip.status = dados.status

            res.send(equip)
        }
    })
    if (status == 0) {
        res.status(404).send("ERRO: Equipamento não encontrado.")
    }
}

const deletarEquipamento = (req, res) => {
    const id = req.params.id
    let status = 0

    equipamentos.forEach((equip, indice) => {
        if (equip.id == id) {
            status = 1
            equipamentos.splice(indice, 1)
            res.send(equipamentos)
        }
    })

    if (status == 0) {
        res.status(404).send("ERRO: Equipamento não encontrado.")
    }
}

const buscarPorId = (req, res) => {
    const id = req.query.id
    let status = 0

    equipamentos.forEach((equip) => {
        if (equip.id == id) {
            status = 1
            res.send(equip)
        }
    })

    if (status == 0) {
        res.status(404).send("ERRO: Equipamento não encontrado.")
    }
}

const buscarPorNome = (req, res) => {
    const equipamento = req.query.equipamento
    let status = 0
    let resp = []

    equipamentos.forEach((equip) => {
        if (equip.equipamento.toLowerCase() == equipamento.toLowerCase()) {
            status = 1
            resp.push(equip)
        }
    })

    if (status == 0) {
        res.status(404).send("ERRO: Equipamento não encontrado.")
    } else {
        res.send(resp)
    }
}

const buscarPorLocal = (req, res) => {
    const local = req.query.local
    let status = 0
    let resp = []

    equipamentos.forEach((equip) => {
        if (equip.local.toLowerCase() == local.toLowerCase()) {
            status = 1
            resp.push(equip)
        }
    })

    if (status == 0) {
        res.status(404).send("ERRO: Equipamento não encontrado.")
    } else {
        res.send(resp)
    }
}

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/', rotaInicial)
app.get('/consumo', lerEquipamentos)
app.get('/consumo/id', buscarPorId)
app.get('/consumo/local', buscarPorLocal)
app.get('/consumo/nome', buscarPorNome)
app.post('/consumo', cadastrarEquipamento)
app.patch('/consumo/:id', atualizarEquipamento)
app.delete('/consumo/:id', deletarEquipamento)


app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})