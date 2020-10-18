import { ItemVenda } from "./item_venda";
import { Loja } from "./loja";
import { Produto } from "./produto";

export class Venda {
    constructor(
        public loja : Loja,
        public ccf : string,
        public coo : string,
        public datahora : string = Venda.data_hora_atual(),
        public itens : ItemVenda[] = []
    ) { }
    
    public static data_hora_atual() : string {
        let data = new Date()

        let dia : number = + data.getDate()
        let mes : number = + data.getMonth() + 1
        let ano : number = + data.getFullYear()

        let _dia : string = dia < 10? `0${dia}` : `${dia}`
        let _mes : string = mes < 10? `0${mes}` : `${mes}`

        let h : number = + data.getHours()
        let m : number = + data.getMinutes()
        let s : number = + data.getSeconds()

        let _h : string = h < 10? `0${h}` : `${h}`
        let _m : string = m < 10? `0${m}` : `${m}`
        let _s : string = s < 10? `0${s}` : `${s}`
        
        return `${_dia}/${_mes}/${ano} ${_h}:${_m}:${_s}V`
    }

    public numero_de_itens() : number {
        return this.itens.length
    }

    public calcular_total() : number {
        let total : number = 0
        this.itens.forEach((item : ItemVenda) => {
            total += item.get_valor_total()
        })
        return total
    }

    public dados_venda () : string {
        this.validar_campos_obrigatorios()

        let _ccf : string = `CCF: ${this.ccf}` 
        let _coo : string = `COO: ${this.coo}` 
        return `${this.datahora} ${_ccf} ${_coo}`
    }

    public dados_itens() : string {
        let stringfy : string = ""
        this.itens.forEach((item : ItemVenda) => {
            let strItem = `${item.dados_item()}`
            stringfy = !stringfy?  (stringfy += strItem) : (stringfy += `\n${strItem}`)
        })
        return `ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)\n` +
               `${stringfy}`
    }

    public imprimir_cupom() : string {
        if (this.numero_de_itens() == 0)
            throw new Error("Não há itens para imprimir.")
        
        let dados_loja : string = this.loja.dados_loja();
        let dados_venda : string = this.dados_venda();
        let dados_itens : string = this.dados_itens();

        return (
`${dados_loja}${"-".repeat(30)}
${dados_venda}
    CUPOM FISCAL    
${dados_itens}
${"-".repeat(30)}
TOTAL: R$ ${this.calcular_total()}`
        )
    }

    public adicionar_item(
        produto : Produto, 
        quantidade : number
    ) : void {
        this.validar_item_adicionado(produto, quantidade)

        let id : number = this.itens.length + 1
        let itemVenda : ItemVenda = new ItemVenda(
            id,
            produto,
            quantidade
        )
        this.itens.push(itemVenda)
    }

    public is_duplicado(codigo : string) : boolean {
        let itens_iguais : ItemVenda[] = this.itens.filter(
            (item : ItemVenda) => (item.produto.codigo == codigo)
        )
        return itens_iguais.length > 0;
    }

    public validar_item_adicionado(
        produto : Produto, 
        quantidade : number
    ) : void {
        
        if(produto.valor_unitario <= 0){
            throw new Error("Produto com valor unitário zero ou negativo.")
        }

        if(quantidade <= 0){
            throw new Error("Item de Venda com quantidade zero ou negativa.")
        }

        if(this.is_duplicado(produto.codigo)){
            throw new Error("O produto já está na lista.")
        }
    }

    public validar_campos_obrigatorios() : void {
        if(!this.coo){
            throw new Error("O Contador de Ordem de Operação (COO) é obrigatório.")
        }

        else if(this.coo.length != 6){
            throw new Error("O COO inserido não é válido.");
        }

        if(!this.ccf){
            throw new Error("O Contador de Cupom Fiscal (CCF) é obrigatório.");
        }

        else if(this.ccf.length != 6){
            throw new Error("O CCF inserido não é válido.");
        }

        try{
            this.loja.dados_loja()
        } catch(e) {
            throw new Error("Loja é um campo obrigatório. Insira uma loja válida.")
        }
    }
}