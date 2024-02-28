#!/usr/bin/env php
<?php
$port = $argc > 1 ? $argv[1] : 3000;
echo "Server running at http://localhost:$port/\n";
system("php -S localhost:$port");
