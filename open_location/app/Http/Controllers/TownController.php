<?php

namespace App\Http\Controllers;

use App\Town;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class TownController extends Controller
{
    public function town($id){
        $department = Town::with(['type','headquarters.institution'])->findOrFail($id);
        return $department;
    }
    public function headquarters($id){
        $headquarters = DB::table('headquarters')
        ->join('towns', 'towns.id', '=', 'headquarters.town_id')
        ->where('towns.id','=',$id)
        ->select('headquarters.id','headquarters.name')
        ->get();
        return $headquarters;
    }
}
