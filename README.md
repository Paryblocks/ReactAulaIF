## Projeto Prática React
Um simples front e backend utilizando React, focando na prática da utilização de componentes e estados do React.

### Dados usados para simular Fetch
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$dados = [
    [
        'index' => 1,
        'descricao' => 'Salário',
        'valor' => 1000.00,
        'tipo' => 'entrada'
    ],
    [
        'index' => 2,
        'descricao' => 'Café',
        'valor' => 8.50,
        'tipo' => 'saida'
    ]
    ];

echo json_encode($dados);