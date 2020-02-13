<?php

namespace App\Http\Controllers;

use App\Headquarter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HeadquarterController extends Controller
{
    //
    public function headquarter($id){
        $headquarter = Headquarter::with(['institution','town'])->findOrFail($id);
        return $headquarter;
    }

    public function headquarterByName($name){
        $name = strtoupper($name);
        $headquarter = DB::table('headquarters')->select('id')->where('name', $name)->get();
        return $headquarter;
    }
}
