<!DOCTYPE html>
<html>

<head>
    <title>KEBS Mail</title>
</head>

<body>
    <h1>Event Booking Confirmation Mail</h1>
    <p> 
        Dear {{$data['user']->name}}, </br> </br>
        Your booking for the event <strong>{{$data['event']->name}}</strong> on the <strong> 
        {{$data['event']->date_time}}</strong> for your child <strong> {{$data['child']->name}} </strong> has been confirmed.

    <p>Thank you</p>
</body>

</html>
