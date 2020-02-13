<?php

namespace App\Http\Controllers;

use App\Department;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartmentController extends Controller
{
    public function department($id){
        $department = Department::with(['towns.type','towns.department','towns.headquarters.institution'])->findOrFail($id);
        return $department;
    }
    public function headquarters($id){
        $headquarters = DB::table('headquarters')
        ->join('towns', 'towns.id', '=', 'headquarters.town_id')
        ->join('departments', 'departments.id', '=', 'towns.department_id')
        ->where('departments.id','=',$id)
        ->select('headquarters.id','headquarters.name')
        ->get();
        return $headquarters;
    }
}
