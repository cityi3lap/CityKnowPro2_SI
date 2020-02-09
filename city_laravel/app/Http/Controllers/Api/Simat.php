<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\GameUser;

class Simat extends Controller
{
    /**
     * Receives a JSON and add a new row in the students table.
     */
    protected function save(Request $request) {
        // return $request;
        $users = $request->get('users');
        
        $correct = false;
        // return gettype($users);
        foreach ($users as $key=>$user) {
            
            $user = (object) $user;
            // return $user;
            
            $map_skin_id = $user->map_skin_id ?? 100;
            $username = $user->nombre1[0].$user->nombre2[0].$user->apellido1[0].substr($user->doc, -4);
            // return $username;
            
            $correct = GameUser::create([
                'first_name' => strtoupper($user->nombre1),
                'second_name' => strtoupper($user->nombre2),
                'first_surname' => strtoupper($user->apellido1),
                'second_surname' => strtoupper($user->apellido2),
                'username' => strtoupper($username),
                'headquarter_id' => $user->codigo_dane_sede,
                'grade_id'=>$user->grado_cod,
                'map_skin_id' => $map_skin_id
            ]);

            // return $correct;
            
        }
        
        if ($correct) {
            http_response_code(201);
            echo json_encode(array("message" => "Info saved correctly."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "There was an error saving the info."));
        }
    }
}
