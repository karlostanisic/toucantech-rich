<?php

require_once 'config/db.php';
require_once 'objects/member.php';
require_once 'objects/school.php';

$member = new Member($connection);
$member->memberID = 2;
$schools = $member->retrieveSchools();
$banana = [];
if ($banana != FALSE) {
    echo "Juhu";
}

?>