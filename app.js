document.getElementById('investmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura os valores inseridos pelo usuário
    const valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const numeroMeses = parseInt(document.getElementById('numeroMeses').value);
    const rendimentoPercentual = parseFloat(document.getElementById('rendimentoPercentual').value);
    const aporteMensal = parseFloat(document.getElementById('aporteMensal').value);

    // Referências aos campos e mensagens de erro
    const valorInicialInput = document.getElementById('valorInicial');
    const numeroMesesInput = document.getElementById('numeroMeses');
    const rendimentoPercentualInput = document.getElementById('rendimentoPercentual');
    const aporteMensalInput = document.getElementById('aporteMensal');

    // Limpeza de mensagens e estilos de erro anteriores
    const inputs = [valorInicialInput, numeroMesesInput, rendimentoPercentualInput, aporteMensalInput];
    inputs.forEach(input => input.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());

    let valid = true;

    // Função para adicionar erro
    const adicionarErro = (input, mensagem) => {
        input.classList.add('error');
        const mensagemErro = document.createElement('div');
        mensagemErro.textContent = mensagem;
        mensagemErro.classList.add('error-message');
        input.parentNode.insertBefore(mensagemErro, input.nextSibling);
        valid = false;
    };

    // Verificações de limite
    if (numeroMeses > 600) {
        adicionarErro(numeroMesesInput, "O número máximo de meses permitido para a simulação é 600.");
    }

    if (valorInicial > 1000000) {
        adicionarErro(valorInicialInput, "O valor inicial máximo permitido é de R$ 1.000.000,00.");
    }

    if (aporteMensal > 1000000) {
        adicionarErro(aporteMensalInput, "O aporte mensal máximo permitido é de R$ 1.000.000,00.");
    }

    if (rendimentoPercentual > 5) {
        adicionarErro(rendimentoPercentualInput, "O rendimento mensal máximo permitido é de 5%.");
    }

    // Interrompe a execução caso algum valor seja inválido
    if (!valid) return;

    let montanteFinal = valorInicial;
    let saldos = [valorInicial];
    let rendimentos = [];

    // Calcula o montante com aportes mensais e rendimento composto
    for (let mes = 1; mes <= numeroMeses; mes++) {
        let rendimento = montanteFinal * (rendimentoPercentual / 100);
        rendimentos.push(rendimento);
        montanteFinal += rendimento + aporteMensal;
        saldos.push(montanteFinal);
    }

    // Formata os valores para exibição em moeda brasileira
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Captura o rendimento do último mês corretamente
    let rendimentoUltimoMes = rendimentos[rendimentos.length - 1];

    // Corrigido para pegar o saldo do penúltimo mês (último saldo acumulado antes de adicionar o rendimento final)
    let saldoFinalCorreto = saldos[saldos.length - 2];

    // Exibe os resultados detalhados na tela
    let resultadoHTML = `<h2>Resultados:</h2>
        <p>O montante final após ${numeroMeses} meses é: <strong>${formatarMoeda(saldoFinalCorreto)}</strong> 
        com rendimento de <strong>${formatarMoeda(rendimentoUltimoMes)}</strong> no último mês.</p>
        <table>
            <tr>
                <th>Mês</th>
                <th>Saldo Acumulado</th>
                <th>Rendimento</th>
            </tr>`;

    for (let i = 0; i < rendimentos.length; i++) {
        resultadoHTML += `<tr>
            <td>${i}</td>
            <td>${formatarMoeda(saldos[i])}</td>
            <td>${formatarMoeda(rendimentos[i])}</td>
        </tr>`;
    }

    resultadoHTML += `</table>`;

    document.getElementById('resultado').innerHTML = resultadoHTML;

    // Mostra o botão de nova simulação
    document.getElementById('novaSimulacao').classList.remove('hidden');
});
