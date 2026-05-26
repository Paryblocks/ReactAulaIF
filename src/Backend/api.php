<?php
require_once "registro_model.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if(isset($_REQUEST['acao'])){
    $acao = $_REQUEST['acao'];

    switch($acao){
    case 'buscar':
        $dados = Registro::listarTudo();
        echo json_encode($dados);
        break;

    case 'salvar':
        $json_recebido = file_get_contents( "php://input" );
        $dados = json_decode($json_recebido, true);

        if ($dados) {
            $novoRegistro = new Registro($dados['descricao'], $dados['valor'], $dados['tipo']);
            $idGerado = $novoRegistro->salvar();
            echo json_encode(["id" => $idGerado]);
        }
        break;

    case 'excluir':
        Registro::excluir($_GET['id']);
        break;
    }
}