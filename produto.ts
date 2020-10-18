
export class Produto {
    
    constructor(
        public codigo : string,
        public descricao : string,
        public unidade : string,
        public valor_unitario : number,
        public substituicao_tributaria : string
    ) { }
}