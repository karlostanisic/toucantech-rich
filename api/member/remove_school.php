<?php

include_once '../config/db.php';
include_once '../objects/member.php';

$data = json_decode(file_get_contents("php://input"));

$member = new Member($connection);
$member->memberID = $data->memberID;

if ($member->removeSchool($data->schoolID)) {
    echo "School removed successfully";
} else {
    echo "Unable to remove school";
}
