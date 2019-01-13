<?php
  session_start();
  if(!isset($_SESSION["username"]))
    header("location: /almafood/login.php");
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>AlmaFood</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link rel="icon" type="image/png" href="./img/almafood.png" sizes="196x196" />
  <!-- styles -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  <link rel="stylesheet" href="css/default.css" />
  <link rel="stylesheet" href="css/navbar.css" />
  <link rel="stylesheet" href="css/dashboard.css" />
  <link rel="stylesheet" href="css/restaurants.css" />
  <link rel="stylesheet" href="css/menu.css" />
  <link rel="stylesheet" href="css/food.css" />
  <!-- scripts -->
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
  <script src="js/login.js"></script>
</head>

<body>
  <nav class="navbar sticky-top">
    <a class="navbar-brand"><?= $_SESSION["nominativo"] ?></a>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a class="nav-link active" href="#">
          <i class="fas fa-bell"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <i class="fas fa-search-location"></i>
          <span>Trova ristoranti</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <i class="fas fa-history"></i>
          <span>Ordini</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="php/exit.php">
          <i class="fas fa-sign-out-alt"></i>
          <span>Esci</span>
        </a>
      </li>
    </ul>
  </nav>

  <?php include("dashboard.html"); ?>
</body>

</html>
