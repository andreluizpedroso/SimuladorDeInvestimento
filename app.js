document.getElementById('investmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura os valores inseridos pelo usuário
    const valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const numeroMeses = parseInt(document.getElementById('numeroMeses').value);
    const rendimentoPercentual = parseFloat(document.getElementById('rendimentoPercentual').value) / 100;
    const aporteMensal = parseFloat(document.getElementById('aporteMensal').value);

    let montanteFinal = valorInicial;
    let saldos = [valorInicial];
    let rendimentos = [];

    // Calcula o montante com aportes mensais e rendimento composto
    for (let mes = 1; mes <= numeroMeses; mes++) {
        let rendimento = montanteFinal * rendimentoPercentual;
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

    // Exibe os resultados detalhados na tela
    let resultadoHTML = `<h2>Resultados:</h2>
        <p>O montante final após ${numeroMeses} meses é: <strong>${formatarMoeda(montanteFinal)}</strong> 
        com rendimento de <strong>${formatarMoeda(rendimentoUltimoMes)}</strong> no último mês.</p>
        <table>
            <tr>
                <th>Mês</th>
                <th>Saldo Acumulado</th>
                <th>Rendimento</th>
            </tr>`;

    // Ajuste para remover a última linha onde o rendimento é zero
    for (let i = 0; i < rendimentos.length; i++) {
        resultadoHTML += `<tr>
            <td>${i}</td>
            <td>${formatarMoeda(saldos[i])}</td>
            <td>${formatarMoeda(rendimentos[i])}</td>
        </tr>`;
    }

    document.getElementById('resultado').innerHTML = resultadoHTML;
});
