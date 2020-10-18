import { Endereco } from "./endereco";

export class Loja {

    constructor(
        public nome_loja: string, 
        public endereco: Endereco,
        public telefone: string, 
        public observacao: string, 
        public cnpj: string, 
        public inscricao_estadual: string
    ) { }

    public dados_loja(): string {

        let _telefone : string = this.telefone? `Tel ${this.telefone}` : ""
        _telefone = this.endereco.cep && _telefone? " " + _telefone : _telefone
        
        const _observacao : string = this.observacao? this.observacao : ""

        const _cnpj : string = `CNPJ: ${this.cnpj}`
        const _inscricao_estadual : string = `IE: ${this.inscricao_estadual}`

        return(
`${this.nome_loja}
${this.endereco.dados_endereco()}${_telefone}
${_observacao}
${_cnpj}
${_inscricao_estadual}
`)
    }

    public validarCamposObrigatorios(): void {
        if (!this.nome_loja)
            throw new Error(`O campo nome da loja é obrigatório`)

        if (!this.cnpj)
            throw new Error("O campo CNPJ da loja é obrigatório")

        if (!this.inscricao_estadual)
            throw new Error("O campo inscrição estadual da loja é obrigatório")
    }
}