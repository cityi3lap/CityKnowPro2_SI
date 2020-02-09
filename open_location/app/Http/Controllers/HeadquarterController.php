<?php

namespace App\Http\Controllers;

use App\Headquarter;
use Illuminate\Http\Request;

class HeadquarterController extends Controller
{
    //
    public function headquarter($id){
        $headquarter = Headquarter::with(['institution','town'])->findOrFail($id);
        return $headquarter;
    }
}
