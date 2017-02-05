<?php

include_once '../config/db.php';
include_once '../objects/member.php';

$data = json_decode(file_get_contents("php://input"));

$member = new Member($connection);
$member->memberID = $data->memberID;
$member->name = $data->name;
$member->emailAddress = $data->emailAddress;

if ($member->update()) {
    echo "Member was successfully updated.";
} else {
    echo "Unable to update member.";
}
