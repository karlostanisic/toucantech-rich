<?php

include_once '../config/db.php';
include_once '../objects/school.php';

$data = json_decode(file_get_contents("php://input"));

$school = new School($connection);
$school->schoolID = $data->schoolID;
$members = $school->retrieveMembers();

echo '{"records":' . json_encode($members) . '}';

