import { Endereco } from './endereco';
import { ItemVenda } from './item_venda';
import { Loja } from './loja';
import { Produto } from './produto';
import { Venda } from './venda';

function verifica_campo_obrigatorio(
    mensagemEsperada: string, 
    venda: Venda
) {
    try {
        venda.dados_venda()
    } catch (e) {
        expect(e.message).toBe(mensagemEsperada)
    }
}

function valida_item_adicionado(
    mensagemEsperada: string, 
    venda: Venda,
    produto: Produto,
    quantidade: number
) {
    try {
        venda.adicionar_item(produto, quantidade)
    } catch (e) {
        expect(e.message).toBe(mensagemEsperada)
    }
}

function valida_impressao(
    mensagemEsperada: string, 
    venda: Venda,
) {
    try {
        venda.imprimir_cupom()
    } catch (e) {
        expect(e.message).toBe(mensagemEsperada)
    }
}

/**
 * @Endereco variaveis
 */

const LOGRADOURO : string = "Rua 1"
const NUMERO : number = 11
const COMPLEMENTO : string = "Complemento 1"
const BAIRRO : string = "Bairro 1"
const MUNICIPIO : string = "Municipio 1"
const ESTADO : string = "Estado 1"
const CEP : string = "11111-111"

/**
 * @Loja variaveis
 */

const NOME_LOJA : string = "Loja 1"
const TELEFONE : string = "(11)1111-1111"
const OBSERVACAO : string = "Observacao 1"
const CNPJ : string = "123456789"
const INSCRICAO_ESTADUAL : string = "987654321"

/**
 * @Produto variaveis
 */

const CODIGO : string = "001"
const DESCRICAO : string = "Banana"
const UNIDADE : string = "R$"
const VALOR_UNITARIO : number = 11.11
const ST : string = "ST"

//
const QTD : number = 3 

const endereco_sample : Endereco = new Endereco(
    LOGRADOURO, 
    NUMERO, 
    COMPLEMENTO, 
    BAIRRO, 
    MUNICIPIO, 
    ESTADO, 
    CEP
)

const loja_sample : Loja = new Loja(
    NOME_LOJA,
    endereco_sample,
    TELEFONE,
    OBSERVACAO,
    CNPJ,
    INSCRICAO_ESTADUAL
)

const COO : string = "123456"
const CCF : string = "123456"

const vendaSample : Venda = new Venda(
    loja_sample,
    CCF,
    COO
)

const produtoSample : Produto = new Produto(
    CODIGO, 
    DESCRICAO, 
    UNIDADE, 
    VALOR_UNITARIO, 
    ST
)

let MSG_ERR_LOJA_INVALIDA : string = "Loja é um campo obrigatório. Insira uma loja válida."
let MSG_ERR_CCF_INVALIDO : string  = "O CCF inserido não é válido."
let MSG_ERR_COO_INVALIDO : string = "O COO inserido não é válido."
let MSG_ERR_CCF : string = "O Contador de Cupom Fiscal (CCF) é obrigatório."
let MSG_ERR_COO : string = "O Contador de Ordem de Operação (COO) é obrigatório."

test('Venda Validar loja', () => {
    let venda = vendaSample;
    
    let loja_com_erros = loja_sample
    loja_com_erros.nome_loja = ""

    venda.loja = loja_com_erros
    verifica_campo_obrigatorio(MSG_ERR_LOJA_INVALIDA, venda)
})

test('Validar CCF', () => {
    let cffVazio = vendaSample
    cffVazio.ccf = ""

    verifica_campo_obrigatorio(MSG_ERR_CCF, cffVazio)

    let cffInvalido = vendaSample
    cffInvalido.ccf = "12345"

    verifica_campo_obrigatorio(MSG_ERR_CCF_INVALIDO, cffInvalido)
})

test('Validar C00', () => {
    let cooVazio = vendaSample
    cooVazio.coo = ""

    verifica_campo_obrigatorio(MSG_ERR_COO, cooVazio)

    let cffInvalido = vendaSample
    cffInvalido.coo = "12345"

    verifica_campo_obrigatorio(MSG_ERR_COO_INVALIDO, cffInvalido)
})

let MSG_ERR_SEM_ITENS : string = "Não há itens para imprimir."
let MSG_ERR_ITEM_DUPLICADO : string = "O produto já está na lista."
let MSG_ERR_QUANTIDADE : string = "Item de Venda com quantidade zero ou negativa."
let MSG_ERR_VALOR_VENDA : string = "Produto com valor unitário zero ou negativo."

test('Venda sem Itens', () => {
    let semItens = vendaSample
    valida_impressao(MSG_ERR_SEM_ITENS, semItens)
})

test('Item Duplicado', () => {
    let itemDuplicado = vendaSample
    itemDuplicado.adicionar_item(produtoSample, 1)
    valida_item_adicionado(
        MSG_ERR_ITEM_DUPLICADO, 
        itemDuplicado,
        produtoSample,
        1
    )
})

test('Quantidade Zero ou Inferior', () => {
    let quantidadeVazia = vendaSample
    valida_item_adicionado(
        MSG_ERR_QUANTIDADE, 
        quantidadeVazia,
        produtoSample,
        0
    )
})

test('Valor Unitario Zero ou Inferior', () => {
    let venda = vendaSample
    
    let valorUnitarioZeroInferior = produtoSample
    valorUnitarioZeroInferior.valor_unitario = -3

    
    valida_item_adicionado(
        MSG_ERR_VALOR_VENDA, 
        venda,
        valorUnitarioZeroInferior,
        1
    )
})

const DATA_HORA = "11/11/1111 11:11:11V" 

const numero_para_um = (text : string) : string => {
    let output = ""
    for(let k of text){
        if (`${+ k}` === "NaN" || k === " ") output += k
        else output += "1"
    }
    return output
}

test('Data hora', () => {
    let datahora = Venda.data_hora_atual()
    expect(numero_para_um(datahora)).toBe(DATA_HORA)
})

/*const HIFENS = "-".repeat(30)
const VU = VALOR_UNITARIO

const TEXTO_ESPERADO_IMPRIMIR_CUPOM : string = (
`${NOME_LOJA}
${LOGRADOURO}, ${NUMERO} ${COMPLEMENTO}
${BAIRRO} - ${MUNICIPIO} - ${ESTADO}
CEP:${CEP} Tel ${TELEFONE}
${OBSERVACAO}
CNPJ: ${CNPJ}
IE: ${INSCRICAO_ESTADUAL}
${HIFENS}
${DATA_HORA} CCF: ${CCF} COO: ${COO}
    CUPOM FISCAL    
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 ${CODIGO} ${DESCRICAO} ${QTD} ${UNIDADE} ${VU.toFixed(2)} ${ST} ${(VU*QTD).toFixed(2)}
${HIFENS}
TOTAL: R$ ${(VU*QTD).toFixed(2)}`
)

let produto_para_cupom = new Produto(
    CODIGO,
    DESCRICAO,
    UNIDADE,
    VALOR_UNITARIO,
    ST
)

let item_venda : ItemVenda = new ItemVenda(1, produto_para_cupom, QTD) 

let venda_imprimir : Venda = new Venda(
    loja_sample,
    CCF,
    COO,
    DATA_HORA,
    [item_venda]
)

test('Imprimir cupom', () => {
    expect(venda_imprimir.imprimir_cupom()).toBe(TEXTO_ESPERADO_IMPRIMIR_CUPOM)
})*/