class CaixaDaLanchonete {
  constructor() {
    this.menu = {
      cafe: { nome: "Café", preco: 3.0 },
      chantily: { nome: "Chantily (extra do Café)", preco: 1.5 },
      suco: { nome: "Suco Natural", preco: 6.2 },
      sanduiche: { nome: "Sanduíche", preco: 6.5 },
      queijo: { nome: "Queijo (extra do Sanduíche)", preco: 2.0 },
      salgado: { nome: "Salgado", preco: 7.25 },
      combo1: { nome: "1 Suco e 1 Sanduíche", preco: 9.5 },
      combo2: { nome: "1 Café e 1 Sanduíche", preco: 7.5 },
    };

    this.formasDePagamento = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    // Verifica se a forma de pagamento é válida
    if (!this.formasDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    // Verifica se há itens no carrinho de compra
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0;

    // Percorre os itens do carrinho
    for (const itemInfo of itens) {
      const [item, quantidade] = itemInfo.split(",");

      const isChantily = itens.some((itens) => itens.includes("chantily"));
      const isCafe = itens.some((itens) => itens.includes("cafe"));

      const isQueijo = itens.some((itens) => itens.includes("queijo"));
      const isSanduiche = itens.some((itens) => itens.includes("sanduiche"));

      // Verifica se o item existe no menu
      if (!this.menu[item]) {
        return "Item inválido!";
      }

      // Verifica se o item é um extra e se o item principal está presente
      if (
        (this.menu[item].nome === "Chantily (extra do Café)" ||
          this.menu[item].nome === "Queijo (extra do Sanduíche)") &&
        itens.length === 1
      ) {
        return `Item extra não pode ser pedido sem o principal`;
      }

      if ((isChantily && !isCafe) || (isQueijo && !isSanduiche)) {
        return "Item extra não pode ser pedido sem o principal";
      }

      // Verifica a quantidade
      if (quantidade < 1) {
        return `Quantidade inválida!`;
      }

      // Calcula o valor total do item
      valorTotal += this.menu[item].preco * parseInt(quantidade);
    }

    // Aplica descontos ou acréscimos baseado na forma de pagamento
    if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95; // Aplicando 5% de desconto
    } else if (metodoDePagamento === "credito") {
      valorTotal *= 1.03; // Aplicando 3% de acréscimo
    }

    // Retorna o valor total formatado como moeda
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
