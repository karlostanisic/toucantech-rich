<?php

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/db.php';
include_once '../objects/school.php';

$school = new School($connection);

$allSchools = $school->readAll();

echo '{"records":' . json_encode($allSchools) . '}';
