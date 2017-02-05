<?php

//header("Content-Type: application/json; charset=UTF-8");

include_once '../config/db.php';
include_once '../objects/member.php';

$data = json_decode(file_get_contents("php://input"));

$member = new Member($connection);
$member->memberID = $data->memberID;
$schools = $member->retrieveSchools();

echo '{"records":' . json_encode($schools) . '}';

