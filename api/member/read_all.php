<?php
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/db.php';
include_once '../objects/member.php';

$member = new Member($connection);

$allMembers = $member->readAll();

echo '{"records":' . json_encode($allMembers) . '}';
