<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

use App\Http\Controllers\Controller;

class GetInfoIntelligences extends Controller
{
    protected function getOne($username) {
        // if (Redis::get('intelligences-'.$username)) {
        //     $result = json_decode(Redis::get('intelligences-'.$username));
        // } else {
            $toReturn = array();
            $regex = '/^[A-Za-z]+[0-9]+/';
            $byUsername = preg_match($regex, $username);
            $toSearch = $byUsername ? 'username' : 'id';

            // $result = DB::table('gu_record_intelligence_ind_desc_styles AS bridge_table')
            //             ->join('intelligence_indicators AS intInd', 'intInd.id', '=',
            //                 'bridge_table.intelligence_indicator_id')
            //             ->join('intelligences AS ints', 'ints.id', '=', 'intInd.intelligence_id')
            //             ->join(DB::raw("(SELECT GROUP_CONCAT(inti.description SEPARATOR '--') AS all_desc, 
            //                 inti.id, gur.mini_game_id FROM intelligence_indicators AS inti
            //                 JOIN gu_record_intelligence_ind_desc_styles guri 
            //                 ON guri.intelligence_indicator_id = inti.id 
            //                 JOIN game_user_records gur ON gur.id = guri.game_user_record_id 
            //                 JOIN game_users gu ON gu.id = gur.game_user_id
            //                 WHERE gu.".$toSearch." = ? GROUP BY intelligence_id) AS joinS"), 
            //                 'joinS.id', '=', 'bridge_table.intelligence_indicator_id')
            //             ->addBinding($username)
            //             ->select('bridge_table.percentage_value', 'ints.name AS int_name',
            //                 'joinS.all_desc', 'joinS.mini_game_id',
            //                 DB::raw('SUM(bridge_table.percentage_value) AS total'))
            //             ->whereRaw('bridge_table.game_user_record_id IN
            //                 (SELECT gur.id FROM game_user_records AS gur JOIN game_users gu
            //                 ON gu.id = gur.game_user_id WHERE gu.'.$toSearch.' = ?)', array($username))
            //             ->groupBy('ints.id')
            //             ->get();
            $result = DB::table('gu_record_intelligence_ind_desc_styles AS bridge_table')
                        ->join('intelligence_indicators AS intInd', 'intInd.id', '=',
                            'bridge_table.intelligence_indicator_id')
                        ->join('intelligences AS ints', 'ints.id', '=', 'intInd.intelligence_id')
                        ->join(DB::raw("(SELECT inti.description, inti.id, gur.mini_game_id 
                            FROM intelligence_indicators AS inti
                            JOIN gu_record_intelligence_ind_desc_styles guri 
                            ON guri.intelligence_indicator_id = inti.id 
                            JOIN game_user_records gur ON gur.id = guri.game_user_record_id 
                            JOIN game_users gu ON gu.id = gur.game_user_id
                            WHERE gu.".$toSearch." = ? GROUP BY inti.id) AS joinS"), 
                            'joinS.id', '=', 'bridge_table.intelligence_indicator_id')
                        ->addBinding($username)
                        ->select('ints.name AS int_name', DB::raw('GROUP_CONCAT(joinS.description SEPARATOR "--") AS all_desc'), 
                            DB::raw('SUM(bridge_table.percentage_value) AS total'))
                        ->whereRaw('bridge_table.game_user_record_id IN
                            (SELECT gur.id FROM game_user_records AS gur JOIN game_users gu
                            ON gu.id = gur.game_user_id WHERE gu.'.$toSearch.' = ?)', array($username))
                        ->groupBy('ints.id')
                        ->get();

            foreach ($result as $key => $element) {
                $descriptions = $element->all_desc;
                if (strrpos($descriptions, '--') !== false) {
                    $descriptions = explode('--', $descriptions);
                }
                $object = (object) array(
                                        // 'mini_game_id' => $element->mini_game_id,
                                        // 'average' => $element->percentage_value,
                                        'intelligence' => $element->int_name,
                                        'description' => $descriptions,
                                        'total' => $element->total);
                array_push($toReturn, $object);
            }

            return $toReturn;

        //     !empty($result[0]) ? Redis::set('intelligences-'.$username, $result->toJson()) : null;
        // }
        
        if (!empty($result[0])) {
            http_response_code(200);
            return $result;
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No info found."));
        }
    }

    protected function getMoreThanOne(Request $request) {
        $result_arr = [];
        $request_arr = $request->all();
        foreach ($request_arr as $key => $username) {
            $regex = '/^[A-Za-z]+[0-9]+/';
            $byUsername = preg_match($regex, $username);
            $toSearch = $byUsername ? 'username' : 'id'; 
            // $result = DB::table('gu_record_intelligence_ind_desc_styles AS bridge_table')
            //             ->join('intelligence_indicators AS intInd', 'intInd.id', '=',
            //                 'bridge_table.intelligence_indicator_id')
            //             ->join('intelligences AS ints', 'ints.id', '=', 'intInd.intelligence_id')
            //             ->join(DB::raw("(SELECT GROUP_CONCAT(inti.description SEPARATOR '--') AS all_desc, 
            //                 inti.id, gur.mini_game_id FROM intelligence_indicators AS inti
            //                 JOIN gu_record_intelligence_ind_desc_styles guri 
            //                 ON guri.intelligence_indicator_id = inti.id 
            //                 JOIN game_user_records gur ON gur.id = guri.game_user_record_id 
            //                 JOIN game_users gu ON gu.id = gur.game_user_id
            //                 WHERE gu.".$toSearch." = ? GROUP BY intelligence_id) AS joinS"), 
            //                 'joinS.id', '=', 'bridge_table.intelligence_indicator_id')
            //             ->addBinding($username)
            //             ->select('bridge_table.percentage_value', 'ints.name AS int_name',
            //                 'joinS.all_desc', 'joinS.mini_game_id')
            //             ->whereRaw('bridge_table.game_user_record_id IN
            //                 (SELECT gur.id FROM game_user_records AS gur JOIN game_users gu
            //                 ON gu.id = gur.game_user_id WHERE gu.'.$toSearch.' = ?)', array($username))
            //             ->get();

            $result = DB::table('gu_record_intelligence_ind_desc_styles AS bridge_table')
                        ->join('intelligence_indicators AS intInd', 'intInd.id', '=',
                            'bridge_table.intelligence_indicator_id')
                        ->join('intelligences AS ints', 'ints.id', '=', 'intInd.intelligence_id')
                        ->join(DB::raw("(SELECT inti.description, inti.id, gur.mini_game_id 
                            FROM intelligence_indicators AS inti
                            JOIN gu_record_intelligence_ind_desc_styles guri 
                            ON guri.intelligence_indicator_id = inti.id 
                            JOIN game_user_records gur ON gur.id = guri.game_user_record_id 
                            JOIN game_users gu ON gu.id = gur.game_user_id
                            WHERE gu.".$toSearch." = ? GROUP BY inti.id) AS joinS"), 
                            'joinS.id', '=', 'bridge_table.intelligence_indicator_id')
                        ->addBinding($username)
                        ->select('bridge_table.percentage_value', 'ints.name AS int_name',
                            DB::raw('GROUP_CONCAT(joinS.description SEPARATOR "--") AS all_desc'), 
                            'joinS.mini_game_id', DB::raw('SUM(bridge_table.percentage_value) AS total'))
                        ->whereRaw('bridge_table.game_user_record_id IN
                            (SELECT gur.id FROM game_user_records AS gur JOIN game_users gu
                            ON gu.id = gur.game_user_id WHERE gu.'.$toSearch.' = ?)', array($username))
                        ->get();
            
            $user_array = array();
            foreach ($result as $key => $element) {
                $descriptions = $element->all_desc;
                if (strrpos($descriptions, '--') !== false) {
                    $descriptions = explode('--', $descriptions);
                }
                $object = (object) array(
                                        // 'mini_game_id' => $element->mini_game_id,
                                        // 'average' => $element->percentage_value,
                                        'intelligence' => $element->int_name,
                                        'description' => $descriptions,
                                        'total' => $element->total);
                array_push($user_array, $object);
            }

            array_push($result_arr, (object) array($username => $user_array));
        }

        return $result_arr;
    }
}
