<?php

include_once '../config/db.php';
include_once '../objects/member.php';

$data = json_decode(file_get_contents("php://input"));

$member = new Member($connection);
$member->name = $data->name;
$member->emailAddress = $data->emailAddress;

if ($member->create()) {
    echo "New member was created.";
} else {
    echo "Error creating new member.";
}
