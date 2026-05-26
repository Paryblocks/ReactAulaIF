<?php
require_once "conexao.php";

class Registro{
    private $id, $descricao, $valor, $tipo;

     public function __construct($descricao, $valor, $tipo){
        $this->descricao = $descricao;
        $this->valor = $valor;
        $this->tipo = $tipo;
    }

    public function salvar(){
        $conn = getConnection();
        $stmt = $conn->prepare("INSERT INTO registro (descricao, valor, tipo) VALUES (:descricao, :valor, :tipo)");
        $stmt->bindParam(":descricao", $this->descricao);
        $stmt->bindParam(":valor", $this->valor);
        $stmt->bindParam(":tipo", $this->tipo);
        if ($stmt->execute()) {
            return $conn->lastInsertId();
        }
    }

    // Não usado no momento, mas vai que precisa
    public static function buscarPorId(int $id) {
        $conn = getConnection();
        $stmt = $conn->prepare("SELECT * FROM registro WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function listarTudo() {
        $conn = getConnection();
        $stmt = $conn->query("SELECT * FROM registro");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Não usado no momento, mas vai que precisa
    public function atualizar(int $id) {
        $conn = getConnection();
        $stmt = $conn->prepare("UPDATE registro SET descricao = :descricao, valor = :valor, tipo = :tipo WHERE id = :id");
        $stmt->bindParam(":descricao", $this->descricao);
        $stmt->bindParam(":valor", $this->valor);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

    public static function excluir($id) {
        $conn = getConnection();
        $stmt = $conn->prepare("DELETE FROM registro WHERE id = :id");
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

}

?>