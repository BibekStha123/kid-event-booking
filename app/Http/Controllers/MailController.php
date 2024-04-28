<?php

namespace App\Http\Controllers;

use App\Mail\EventRemainderMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    //
    public function remainderMail()
    {
        Mail::to('bibekstha084@gmail.com')->send(new EventRemainderMail([
            'name' => 'Bibek',
            'title' => 'Event Remainder',
            'body' => 'This is a event remainder mail.',
        ]));

        return 'Mail sent';
    }
}
