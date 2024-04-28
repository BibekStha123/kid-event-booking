<!DOCTYPE html>
<html>

<head>
    <title>Laravel Mail</title>
</head>

<body>
    <h1>{{ $data['title'] }}</h1>
    <p> 
        Dear {{$data['name']}}, </br>
        {{ $data['body'] }}</p>
    <p>Thank you</p>
</body>

</html>
