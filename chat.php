<?php
$filename = 'messages.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'send') {
        $sender = htmlspecialchars($_POST['sender']);
        $recipient = htmlspecialchars($_POST['recipient']);
        $message = htmlspecialchars($_POST['message']);
        $data = "$recipient|<b>$sender:</b> $message\n";
        file_put_contents($filename, $data, FILE_APPEND);
        echo "Message sent!";
    } elseif ($action === 'load') {
        $recipient = htmlspecialchars($_POST['recipient']);
        if (file_exists($filename)) {
            $lines = file($filename);
            foreach ($lines as $line) {
                if (strpos($line, "$recipient|") === 0) {
                    echo substr($line, strlen($recipient) + 1);
                }
            }
        }
    }
}
?>
