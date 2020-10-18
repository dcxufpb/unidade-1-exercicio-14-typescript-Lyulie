import { Produto } from "./produto";

export class ItemVenda {
    constructor(
        public item : number,
        public produto : Produto,
        public quantidade : number
    ) { }

    public get_valor_total() : number {
        return +(this.produto.valor_unitario * this.quantidade);
    }

    public dados_item() {
        return (
            `${this.item} ${this.produto.codigo} ${this.produto.descricao} ${this.quantidade} ` +
            `${this.produto.unidade} ${this.produto.valor_unitario.toFixed(2)} ` +
            `${this.produto.substituicao_tributaria} ${this.get_valor_total().toFixed(2)}`
        ) 
    }
}
