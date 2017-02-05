<?php

include_once '../config/db.php';
include_once '../objects/member.php';

$data = json_decode(file_get_contents("php://input"));

$member = new Member($connection);
$member->memberID = $data->memberID;
$member->read();

echo json_encode(array(
    "MemberID" => $member->memberID,
    "Name" => $member->name,
    "EmailAddress" => $member->emailAddress
));