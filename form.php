<?php

if (isset($_POST["name"])) {

    $method = $_SERVER['REQUEST_METHOD'];

    $project_name = "Электромонтаж";
    $admin_email  = "orkengun@gmail.com";
    $server_mail = "<info@e-montazh.kz>";
    $form_subject = "Заявка";


    //Script Foreach
    $c = true;
    if ($method === 'POST') {

        foreach ($_POST as $key => $value) {
            if ($value != "") {
                if (is_array($value)) {
                    $value = implode(', ', $value);
                }
                $message .= "
        " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
          <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
          <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
        </tr>
        ";
            }
        }
    }

    $message = "<table style='width: 100%;'>$message</table>";

    function adopt($text)
    {
        return '=?UTF-8?B?' . Base64_encode($text) . '?=';
    }

    $headers = "MIME-Version: 1.0" . PHP_EOL .
        "Content-Type: text/html; charset=utf-8" . PHP_EOL .
        'From: ' . $project_name . ' ' . $server_mail . PHP_EOL;

    mail($admin_email, adopt($form_subject), $message, $headers);


    header("Location: /thanks.html");
}

// Токен телеграм бота
$tg_bot_token = "5549365884:AAFyDNxI1_lDrqcUW7_IeTFupvk3K9pdi9U";
// ID Чата
$chat_id = "-1001616438054";

$text = '';

foreach ($_POST as $key => $val) {
    $text .= $key . ": " . $val . "\n";
}

$text .= "\n" . $_SERVER['REMOTE_ADDR'];
$text .= "\n" . date('d.m.y H:i:s');

$param = [
    "chat_id" => $chat_id,
    "text" => $text
];

$url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendMessage?" . http_build_query($param);

var_dump($text);

file_get_contents($url);

foreach ( $_FILES as $file ) {

    $url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendDocument";

    move_uploaded_file($file['tmp_name'], $file['name']);

    $document = new \CURLFile($file['name']);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, ["chat_id" => $chat_id, "document" => $document]);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    $out = curl_exec($ch);

    curl_close($ch);

    unlink($file['name']);
}

die('1');

