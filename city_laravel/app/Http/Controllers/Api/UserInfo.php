<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Config;

class UserInfo extends Controller
{
    protected function get($username) {
        $regex = '/^[A-Za-z]+[0-9]+/';
        $byUsername = preg_match($regex, $username);
        $toSearch = $byUsername ? 'game_users.username' : 'game_users.id';
        $userInfo = DB::table('game_users')
                        ->join('dissability_game_user AS dgu', 'dgu.game_user_id', '=', 'game_users.id')
                        ->join('dissabilities AS diss', 'diss.id', '=', 'dgu.dissability_id')
                        ->join('grades', 'grades.id', '=', 'game_users.grade_id')
                        ->select('game_users.id', 'game_users.grade_id', 'diss.id AS dissId', 
                            'diss.name AS dissName', 'grades.name AS grade_name')
                        ->where($toSearch, $username)
                        ->first();
        // $grade_obj = (object) array('id'=>$userInfo->grade_id, 'name'=>$userInfo->grade_name);
        $grade_id = $userInfo->grade_id;
        $user_id = $userInfo->id;
        $dissability = (object) array('id' => $userInfo->dissId, 'type' => $userInfo->dissName);

        $locationInfo = DB::table('location_skins AS loc')
                            ->join('locations AS locs', 'locs.id', '=', 'loc.location_id')
                            ->join('location_skin_map_skin AS lsms', 'lsms.location_skin_id', '=', 'loc.id')
                            ->join('map_skins AS ms', 'ms.id', '=', 'lsms.map_skin_id')
                            ->join('game_users AS gu', 'gu.map_skin_id', '=', 'ms.id')
                            ->select('loc.location_id', 'loc.level', 'locs.name')
                            ->where('gu.id', $user_id)
                            ->orderBy('lsms.id', 'desc')
                            ->get();
        if ($locationInfo->isEmpty()) {
            $location = [];
        } else {
            $location = $locationInfo;
            // $location = (object) array('id' => $locationInfo->location_id, 'level' => $locationInfo->level);
        }

        $avatarInfo = DB::table('avatars AS av')
                        ->join('avatar_changes AS ac', 'ac.avatar_id', '=', 'av.id')
                        ->join('game_users AS gu', 'gu.id', '=', 'ac.game_user_id')
                        ->select('av.gender', 'av.skin', 'av.profession', 'av.age',
                                'ac.avatar_name', 'ac.updated_at')
                        ->where('gu.id', $user_id)
                        ->orderBy('ac.id', 'desc')
                        ->first();
        if (!$avatarInfo) {
            $avatar = [];
        } else {
            $server_obj = (object) array('status' => 1, 'lastdate' => $avatarInfo->updated_at,
                                        'platform' => '');
            $avatar_obj = (object) array('name' => $avatarInfo->avatar_name, 'gender' => $avatarInfo->gender, 
                                        'skin' => $avatarInfo->skin, 'proffesion' => $avatarInfo->profession, 
                                        'type' => $avatarInfo->age, 'server' => $server_obj);
            $avatar = array($avatar_obj);
        }

        $data_intelligences = DB::table('gu_record_intelligence_ind_desc_styles AS guri')
                                    ->join('game_user_records AS gur', 'gur.id', '=', 'guri.game_user_record_id')
                                    ->join('mini_games', 'mini_games.id', '=', 'gur.mini_game_id')
                                    ->select('guri.game_user_record_id AS guri_record', 
                                        'mini_games.id_code', 'guri.competence_id', 'gur.errors', 
                                        'gur.repeated_guide', 'gur.total_score', 'gur.updated_at',
                                        'guri.intelligence_indicator_id', 'guri.description_style_id', 
                                        'guri.percentage_value', 'guri.vocational_orientation_id')
                                    ->whereRaw('gur.game_user_id = ? AND gur.id IN 
                                        (SELECT MAX(id) FROM game_user_records WHERE game_user_id = ? 
                                        GROUP BY mini_game_id)', array($user_id, $user_id))
                                    ->get();

        $intel_record_ids_array = array(0);
        $intels_array = array();
        $styles_array = array();
        $vocationals_array = array();
        $intel_minigames_array = array();
        foreach ($data_intelligences as $key => $intel) {
            $minigame_progress_obj = (object) array('errors' => $intel->errors,
                                                    'repeatedGuide' => $intel->repeated_guide,
                                                    'total' => $intel->total_score);
            $minigame_server_obj = (object) array ('status' => 1, 'lastdate' => $intel->updated_at,
                                                    'platform' => '');
            $object_minigame = (object) array('gameid' => $intel->id_code, 
                                            'competence' => $intel->competence_id,
                                            'server' => $minigame_server_obj,
                                            'progress' => $minigame_progress_obj);
            array_push($intel_minigames_array, $object_minigame);
            array_push($intel_record_ids_array, $intel->guri_record);
            if ($intel->intelligence_indicator_id != null) {
                if (!isset($intels_array[$intel->id_code])) $intels_array[$intel->id_code] = array();
                $intel_obj = (object) array('intelligence_indicator' => $intel->intelligence_indicator_id,
                                            'indicator' => $intel->percentage_value);
                array_push($intels_array[$intel->id_code], $intel_obj);
            }
            if ($intel->description_style_id != null) {
                if (!isset($styles_array[$intel->id_code])) $styles_array[$intel->id_code] = array();
                $style_obj = (object) array('style_characteristic' => $intel->description_style_id);
                array_push($styles_array[$intel->id_code], $style_obj);
            }
            if ($intel->vocational_orientation_id != null) {
                if (!isset($vocationals_array[$intel->id_code])) $vocationals_array[$intel->id_code] = array();
                $vocational_obj = (object) array('vocational_indicator' => $intel->vocational_orientation_id);
                array_push($vocationals_array[$intel->id_code], $vocational_obj);
            }
        }
        $intel_record_ids_string = implode(',', $intel_record_ids_array);
        $intel_minigames_array = array_values(array_unique($intel_minigames_array, SORT_REGULAR));

        foreach ($intel_minigames_array as $key => $element) {
            $element->intelligences = isset($intels_array[$element->gameid]) ? $intels_array[$element->gameid] : [];
            $element->styles = isset($styles_array[$element->gameid]) ? $styles_array[$element->gameid] : [];
            $element->vocationals = isset($vocationals_array[$element->gameid]) ? $vocationals_array[$element->gameid] : [];
        }

        $minigames_info = DB::table('game_user_records AS gur')
                            ->join('mini_games AS mg', 'mg.id', '=', 'gur.mini_game_id')
                            ->select('mg.id_code', 'gur.errors', 'gur.repeated_guide', 'gur.total_score',
                                    'gur.updated_at', 'mg.location_id')
                            ->whereRaw('gur.game_user_id = ? AND gur.id IN (SELECT MAX(id) FROM 
                                game_user_records WHERE game_user_id = ? GROUP BY mini_game_id) AND gur.id
                                NOT IN ('.$intel_record_ids_string.')', array($user_id, $user_id))
                            ->get();

        $mini_games_array = array();
        if (!$minigames_info->isEmpty()) {
            foreach ($minigames_info as $key => $element) {
                $server_obj = (object) array ('status' => 1, 'lastdate' => $element->updated_at,
                                                    'platform' => '');
                $progress_obj = (object) array('errors' => $element->errors, 
                                                'repeatedGuide' => $element->repeated_guide,
                                                'total' => $element->total_score);
                $minigame_obj = (object) array('gameid' => $element->id_code, 
                                                'location' => $element->location_id,
                                                'server' => $server_obj, 'progress' => $progress_obj);
                array_push($mini_games_array, $minigame_obj);
            }
        }

        $toReturn = array('playerid' => $username, 'grade' => $grade_id, 'disability' => $dissability,
                        'minigames' => $mini_games_array, 'intelligenceGames' => $intel_minigames_array,
                        'locationspritedata' => $location,
                        'avatar' => $avatar);

        return $toReturn;
    }

    protected function getByRole($userId) {
        $final_array = [];
        $departments_array = [];
        $towns_array = [];
        $headquarters_array = [];
        $institutions_array = [];
        $hq_grades = [];
        $game_users = [];
        $users = [];
        $roles = [];
        $permissions = [];

        $userType_info = DB::table('users')->select('username')->where('id', $userId)->first();
        $userType = $userType_info->username;
        if ($userType === 'admin') {
            $users = DB::table('users')->select('id', 'name', 'username')->where('username', '!=', $userType)->get()->toArray();
            $roles = DB::table('roles')
                        ->join('role_permission', 'role_permission.role_id', '=', 'roles.id')
                        ->join('permissions', 'permissions.id', '=', 'role_permission.permission_id')
                        ->select('roles.id', 'roles.slug', 'roles.name', 'permissions.slug AS slug_permission')
                        ->where('roles.name', '!=', $userType)
                        ->groupBy('roles.id')
                        ->orderBy('permissions.id')
                        ->get()
                        ->toArray();
            $permissions = DB::table('permissions')->select('id', 'name', 'desc')->get()->toArray();
        }

        $location_info = DB::table('users')
                            ->join('user_hierarchies AS uh', 'uh.user_id', '=', 'users.id')
                            ->join('user_role AS ur', 'ur.user_id', '=', 'users.id')
                            ->join('roles AS rl', 'rl.id', '=', 'ur.role_id')
                            ->join('destiny_hierarchies AS dh', 'dh.id', '=', 'rl.destiny_hierarchy_id')
                            ->select('dh.table_name', 'uh.destiny_hierarchy_id')
                            ->where('users.id', $userId)
                            ->get();

        foreach ($location_info as $key => $location) {
            $table_name = $location->table_name;
            $row_id = $location->destiny_hierarchy_id;

            if ($table_name !== 'grades') {
                $open_location = config('env_vars.open_location_url');
                $info_from_location = json_decode(file_get_contents($open_location.'api/'.$table_name.'/'.$row_id));

                // Get info about the grades, they are the same always
                // $grades_info = DB::table('grades')
                //                 ->select('id', 'name')
                //                 ->get();
                // foreach ($grades_info as $key => $grade) {
                //     $to_push_grade = (object) array('id' => $grade->id, 'name' => $grade->name);
                //     array_push($grades_array, $to_push_grade);
                // }
            } else {
                // Get info about the grades, they are the same always
                // $grades_info = DB::table('grades')
                //                 ->select('id', 'name')
                //                 ->where('id', $row_id)
                //                 ->get();
                // foreach ($grades_info as $key => $grade) {
                //     $to_push_grade = (object) array('id' => $grade->id, 'name' => $grade->name);
                //     array_push($grades_array, $to_push_grade);
                // }
            }

            if ($table_name == 'departments') {
                $to_push_first_level = (object) array('id' => $info_from_location->id, 
                                                    'name' => $info_from_location->name);
                array_push($departments_array, $to_push_first_level);
                foreach ($info_from_location->towns as $key => $town) {
                    $to_push_town_ = (object) array('id' => $town->id, 'name' => $town->name, 
                                                    'department_id' => $town->department_id);
                    array_push($towns_array, $to_push_town_);
                    foreach ($town->headquarters as $key => $headquarter) {
                        $to_push_headquarter = (object) array('id' => $headquarter->id, 
                                                            'name' => $headquarter->name, 
                                                            'department_id' => $town->department_id,
                                                            'town_id'=> $town->id,
                                                            'institution_id'=> $headquarter->institution_id);
                        $inst = $headquarter->institution;
                        $inst_to_add = (object) array('id'=>$inst->id, 'name'=>$inst->name);
                        array_push($headquarters_array, $to_push_headquarter);
                        array_push($institutions_array, $inst_to_add);
                    }
                }
            } else if ($table_name == 'towns') {
                $to_push_first_level = (object) array('id' => $info_from_location->id, 
                                                    'name' => $info_from_location->name,
                                                    'department_id' => $info_from_location->department_id);
                array_push($towns_array, $to_push_first_level);
                foreach ($info_from_location->headquarters as $key => $headquarter) {
                    $to_push_headquarter = (object) array('id' => $headquarter->id, 
                                                        'name' => $headquarter->name,
                                                        'department_id' => $info_from_location->department_id,
                                                        'town_id' => $headquarter->town_id,
                                                        'institution_id' => $headquarter->institution_id);
                    array_push($headquarters_array, $to_push_headquarter);
                    $inst = $headquarter->institution;
                    $inst_to_add = (object) array('id' => $inst->id, 'name' => $inst->name);
                    array_push($institutions_array, $inst_to_add);
                }
            } else if ($table_name == 'institutions') {
                $to_push_first_level = (object) array('id' => $info_from_location->id,
                                                    'name' => $info_from_location->name);
                array_push($institutions_array, $to_push_first_level);
                foreach ($info_from_location->headquarters as $key => $headquarter) {
                    $to_push_headquarter = (object) array('id' => $headquarter->id,
                                                        'name' => $headquarter->name,
                                                        'department_id' => $headquarter->town->department_id,
                                                        'town_id' => $headquarter->town_id,
                                                        'institution_id' => $headquarter->institution_id);
                    array_push($headquarters_array, $to_push_headquarter);
                }
            } else if ($table_name == 'headquarters') {
                $headquarter = $info_from_location;
                $to_push_headquarter = (object) array('id' => $headquarter->id,
                                                    'name' => $headquarter->name,
                                                    'department_id' => $headquarter->town->department_id,
                                                    'town_id' => $headquarter->town_id,
                                                    'institution_id' => $headquarter->institution->id);
                array_push($headquarters_array, $to_push_headquarter);
            } 
        }
        $institutions_array = $this->unique_array_by_id($institutions_array);

        foreach ($headquarters_array as $key => $hq) {
            $info_hq_grade = DB::table('grades')
                                ->join('game_users AS gu', 'gu.grade_id', '=', 'grades.id')
                                ->select('grades.id', 'grades.name', 'gu.username', 'gu.id AS userId')
                                ->where('gu.headquarter_id', $hq->id)
                                ->get();

            foreach ($info_hq_grade as $key => $hq_g) {
                $hq_grade_to_push = (object) array('id' => $hq->id.'-'.$hq_g->id,
                                                    'name' => $hq->name.' - '.$hq_g->name);
                array_push($hq_grades, $hq_grade_to_push);

                $game_user_to_push = (object) array('id' => $hq_g->userId, 'name' => $hq_g->username);
                array_push($game_users, $game_user_to_push);
            }
        }

        $final_array = array('departments'=>$departments_array, 'towns'=>$towns_array,
                            'institutions'=>$institutions_array, 'headquarters'=>$headquarters_array, 
                            'hq_grades'=>$hq_grades, 'game_users'=>$game_users, 'users'=>$users,
                            'roles'=>$roles, 'permissions'=>$permissions);
        return $final_array;
    }

    protected function unique_array_by_id($array) {
        $array_to_return = array();
        foreach ($array as $key => $element) {
            if (!in_array($element, $array_to_return)) array_push($array_to_return, $element);
        }
        return $array_to_return;
    }
}