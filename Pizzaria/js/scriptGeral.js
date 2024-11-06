

function limpa_formulário_cep() {
    
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}
function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
} 
else {
    
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {


var cep = valor.replace(/\D/g, '');


if (cep != "") {

   
    var validacep = /^[0-9]{8}$/;

    
    if(validacep.test(cep)) {

        
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        
        var script = document.createElement('script');

        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        
        document.body.appendChild(script);

    } 
    else {
        
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} 
else {
    
    limpa_formulário_cep();
}
};

var listaPedido = [];
var posicaoPedido= 0;

class Pizza {
  nome;
  valor;
  quantidade;
  selecionado;

  constructor(nome, valor) {
    this.nome = nome;
    this.valor = valor;
    this.quantidade = 1;
    this.selecionado = false;
  }
  
  selecionarPizza() {
  this.selecionado = true;
  }

  calculaPreco() {
    if (this.selecionado) {
    return this.valor * this.quantidade;
    }
  }

  aumentarNumeroPedido() {
      if (this.selecionado) {
    this.quantidade++
    }
  }

  diminuirNumeroPedido() {
      if (this.selecionado) {
   			if (this.quantidade > 1) {
        this.quantidade--
        }
    }
  }
}

function mostrar() {
for (let pizzas of listaPedido) {
console.log(pizzas);            
}
}

function selecionar(id) {

    let pizzaNome             = document.getElementsByName("tipo")[id].innerText; 
    let pizzaPreco             = parseFloat(document.getElementsByName("custo")[id].innerText);
        
    criarPizza(pizzaNome, pizzaPreco);
}

function criarPizza(nome, preco) {
    const verificar = listaPedido.find(pizza => pizza.nome === nome);
    
    if (!(verificar)) {
    const pizzaNova = new Pizza(nome, preco);
    pizzaNova.selecionarPizza();
      listaPedido.push(pizzaNova);
      criarPainel(pizzaNova);
    }
}
function criarPainel(pizza) {
    			
    if (document.getElementById(`pizza-${pizza.nome}`)) {
            return;
        	}
          
    const DIVpedido_container = document.createElement('div'),
          DIVpedido_desc = document.createElement('div'),
          DIVpedido_quantidade_remover = document.createElement('div'),
          DIVpedido_quantidade = document.createElement('div'),
          DIVpedido_remover = document.createElement('div'),
          DIVpollar_container = document.createElement('div'),

    		  H2nome = document.createElement('h2'),
    			Pquantidade = document.createElement('p'),
          
    		 	BUTTONadicionar = document.createElement('button'),
    			BUTTONdiminuir = document.createElement('button'),
   	
    		  Premover = document.createElement('p'),
          IMGremover = document.createElement('img'),
          IMGpizza = document.createElement('img');
          
          
          
          //CLASSIFICANDO OS ELEMENTOS HTML DO PAINEL DE PEDIDO
          const DIVordem = document.getElementById("DIVordem");
          
            DIVordem.appendChild(DIVpedido_container);
		    DIVpedido_container.setAttribute("class", "pedido-container");
            DIVpedido_container.setAttribute("id", `pizza-${pizza.nome}`);
			DIVpedido_desc.setAttribute("class", "desc-container-pedido");
			DIVpedido_quantidade_remover.setAttribute("class", "quantidade-remover-container");
			DIVpedido_quantidade.setAttribute("class", "quantidade-container-pedido");
			DIVpedido_remover.setAttribute("class", "remover-container");
			DIVpollar_container.setAttribute("class", "pizza-pollar");

            BUTTONadicionar.setAttribute("class", "texto-branco medio");
            BUTTONdiminuir.setAttribute("class", "texto-branco medio");
					
          Premover.setAttribute("class", "texto-vermelho");
          IMGremover.setAttribute("src", "/img/remover.png");
          IMGremover.setAttribute("class", "remover-png");
          IMGpizza.setAttribute("class", "pollar");
          IMGpizza.setAttribute("src", `/img/${pizza.nome}.png`);
          //JUNTANDO AS DIVS
          
          DIVpedido_container.appendChild(DIVpollar_container);
          DIVpedido_container.appendChild(DIVpedido_desc);
          DIVpedido_container.appendChild(DIVpedido_quantidade_remover);

          //JUNTANDO AS SUBDIVS
          
          DIVpollar_container.appendChild(IMGpizza);    
          DIVpedido_quantidade_remover.appendChild(DIVpedido_quantidade);
          DIVpedido_quantidade_remover.appendChild(DIVpedido_remover);   
          
          //JUNTANDO OS ELEMENTOS
          
            DIVpedido_desc.appendChild(H2nome);
          DIVpedido_desc.appendChild(Pquantidade);
          
         	DIVpedido_quantidade.appendChild(BUTTONadicionar);
          DIVpedido_quantidade.appendChild(BUTTONdiminuir);
          
          DIVpedido_remover.appendChild(Premover);
          DIVpedido_remover.appendChild(IMGremover);
          
          //TEXTO
          
          H2nome.innerText = pizza.nome;
          Pquantidade.innerText = `Quantidade: ${pizza.quantidade}`;
          BUTTONdiminuir.innerText = "-";
          BUTTONadicionar.innerText = "+";	
          Premover.innerText = "REMOVER";
					
          //BOTÕES - ADICIONAR/DIMINUIR
          
          BUTTONadicionar.onclick = () => {
          	pizza.aumentarNumeroPedido();
            Pquantidade.innerText = `Quantidade: ${pizza.quantidade}`
          };
          
          BUTTONdiminuir.onclick = () => {
          	pizza.diminuirNumeroPedido();
            Pquantidade.innerText = `Quantidade: ${pizza.quantidade}`
          };
          
          //REMOVER
          DIVpedido_remover.onclick = () => {
          removerPizza(pizza.nome);
          DIVpedido_container.remove();
          }
}			

function removerPizza(nome) {
	listaPedido = listaPedido.filter(pizza => pizza.nome !==nome);
}