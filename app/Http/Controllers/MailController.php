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
            'title' => 'The Title',
            'body' => 'The Body',
        ]));

        return 'Mail sent';
    }
}
