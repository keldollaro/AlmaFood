<?php
require_once "utils/session.php";
require_once "utils/errors.php";
require_once "utils/connection.php";

// QUERY
foreach (array("cliente", "fornitore") as $table) {
  $statement = $connection->prepare("SELECT * FROM " . $table . " WHERE email = ? OR username = ?");
  $statement->bind_param("ss", $_POST["user"], $_POST["user"]);
  $statement->execute();
  $result = $statement->get_result();
  checkError($result === false, "SERVER", "QUERY", $connection->error);
  if ($data = $result->fetch_assoc())
    break;
}
$statement->close();
$connection->close();

// DATA
checkError($data === NULL, "USER", "USERNAME", "questo username/e-mail non è presente");
checkError($data["password"] != $_POST["password"], "USER", "PASSWORD", "password errata");
unset($data["password"]);

// SESSION AND COOKIES
if (isset($data["ristorante"])) {
  $_SESSION["tipo"] = "fornitore";
  $_SESSION["nominativo"] = $data["ristorante"];
} else {
  $_SESSION["tipo"] = "cliente";
  $_SESSION["nominativo"] = $data["nome"] . " " . $data["cognome"];
}
$expires = $_POST["remember"] == "true" ? 2147483647 : 1;
foreach ($data as $key => $value) {
  $_SESSION[$key] = $value;
  setcookie($key, $value, $expires, "/");
}

closeWithoutErrors();
?>
