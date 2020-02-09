<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

use App\Http\Controllers\Controller;

class GetByGrade extends Controller
{
    /**
     * Receives a grade id and returns the average of score for every subject segmented by grade. First 
     * looks for the info in Redis, if that's not found then looks for the info in the database and saves it 
     * in Redis.
     */
    protected function get($headquarter, $id) {
        // if (Redis::get('grade-'.$id)) {
        //     $result = json_decode(Redis::get('grade-'.$id));
        // } else {
            $result = DB::table('game_user_records')
                        ->join('game_users', 'game_user_records.game_user_id', '=', 'game_users.id')
                        ->join('grades', 'game_users.grade_id', '=', 'grades.id')
                        ->join('mini_games', 'game_user_records.mini_game_id', '=', 'mini_games.id')
                        ->join('subject_mini_game', 'mini_games.id', '=', 'subject_mini_game.mini_game_id')
                        ->join('subjects', 'subject_mini_game.subject_id', '=', 'subjects.id')
                        ->select(DB::raw('ROUND(AVG(game_user_records.total_score),1) as average, subjects.name'))
                        ->where('grades.id', $id)
                        ->where('game_users.headquarter_id', $headquarter)
                        ->groupBy('subjects.name')
                        ->get();

        //     !empty($result[0]) ? Redis::set('grade-'.$id, $result->toJson()) : null;
        // }
        
        if (!empty($result[0])) {
            http_response_code(200);
            return $result;
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No info found."));
        }
    }

    protected function getIntelligences($headquarter, $id) {
        $result = DB::table('gu_record_intelligence_ind_desc_styles AS guri')
                    ->join('game_user_records', 'guri.game_user_record_id', '=', 'game_user_records.id')
                    ->join('game_users', 'game_users.id', '=', 'game_user_records.game_user_id')
                    ->join('intelligence_indicators AS intin', 'intin.id', '=', 'guri.intelligence_indicator_id')
                    ->join('intelligences', 'intelligences.id', '=', 'intin.intelligence_id')
                    // ->select(DB::raw("ROUND(AVG(guri.percentage_value),1) as average, 
                    //     GROUP_CONCAT(intin.description SEPARATOR '--') AS all_desc, intelligences.name"))
                    ->select(DB::raw("guri.percentage_value, intin.description, intelligences.name, game_users.id"))
                    ->where('game_users.headquarter_id', $headquarter)
                    ->where('game_users.grade_id', $id)
                    // ->groupBy('intelligences.name')
                    ->get();

        $toReturn = getGlobalIntelligencesInfo($result);

        if (!empty($result[0])) {
            http_response_code(200);
            return $toReturn;
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No info found."));
        }
    }

    protected function getStyles($headquarter, $id) {
        $result = DB::table('gu_record_intelligence_ind_desc_styles AS guri')
                    ->join('game_user_records', 'guri.game_user_record_id', '=', 'game_user_records.id')
                    ->join('game_users', 'game_users.id', '=', 'game_user_records.game_user_id')
                    ->join('description_styles AS descSt', 'descSt.id', '=', 'guri.description_style_id')
                    ->join('styles', 'styles.id', '=', 'descSt.style_id')
                    // ->select(DB::raw("COUNT(styles.id) as average, 
                    //     GROUP_CONCAT(descSt.description SEPARATOR '--') AS all_desc, styles.name,
                    //     styles.description AS extra_name"))
                    ->select('styles.id', 'descSt.description', 'styles.name', 'styles.description AS extra_name',
                        'game_users.id')
                    ->where('game_users.headquarter_id', $headquarter)
                    ->where('game_users.grade_id', $id)
                    // ->groupBy('styles.name')
                    ->get();

        $toReturn = getGlobalStylesInfo($result);
        
        if (!empty($result[0])) {
            http_response_code(200);
            return $toReturn;
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No info found."));
        }
    }

    protected function getIntelligencesByCompetence($headquarter, $id) {
        $result = DB::table('gu_record_intelligence_ind_desc_styles AS guri')
                    ->join('game_user_records', 'guri.game_user_record_id', '=', 'game_user_records.id')
                    ->join('game_users', 'game_users.id', '=', 'game_user_records.game_user_id')
                    ->join('intelligence_indicators AS intin', 'intin.id', '=', 'guri.intelligence_indicator_id')
                    ->join('intelligences', 'intelligences.id', '=', 'intin.intelligence_id')
                    ->join('competences', 'competences.id', '=', 'guri.competence_id')
                    // ->select(DB::raw("ROUND(AVG(guri.percentage_value),1) as average, 
                    //     GROUP_CONCAT(intin.description SEPARATOR '--') AS all_desc, intelligences.name,
                    //     competences.id AS competence"))
                    ->select(DB::raw("guri.percentage_value, intin.description, intelligences.name, game_users.id,
                        competences.id AS competence"))
                    ->where('game_users.headquarter_id', $headquarter)
                    ->where('game_users.grade_id', $id)
                    // ->groupBy('competences.name', 'intelligences.name')
                    ->get();

        $toReturn = getGlobalIntelligencesByCompetenceInfo($result);
        
        if (!empty($result[0])) {
            http_response_code(200);
            return $toReturn;
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No info found."));
        }
    }

    protected function getStylesByCompetence($headquarter, $id) {
        $result = DB::table('gu_record_intelligence_ind_desc_styles AS guri')
                    ->join('game_user_records', 'guri.game_user_record_id', '=', 'game_user_records.id')
                    ->join('game_users', 'game_users.id', '=', 'game_user_records.game_user_id')
                    ->join('description_styles AS descSt', 'descSt.id', '=', 'guri.description_style_id')
                    ->join('styles', 'styles.id', '=', 'descSt.style_id')
                    ->join('competences', 'competences.id', '=', 'guri.competence_id')
                    // ->select(DB::raw("COUNT(styles.id) as average, 
                    //     GROUP_CONCAT(descSt.description SEPARATOR '--') AS all_desc, 
                    //     competences.id AS competence, styles.name, styles.description AS extra_name"))
                    ->select('styles.id', 'descSt.description', 'styles.name', 'styles.description AS extra_name',
                        'game_users.id', 'competences.id AS competence')
                    ->where('game_users.headquarter_id', $headquarter)
                    ->where('game_users.grade_id', $id)
                    // ->groupBy('competences.name', 'styles.name')
                    ->get();

        $toReturn = getGlobalStylesByCompetenceInfo($result);
        
        if (!empty($result[0])) {
            http_response_code(200);
            return $toReturn;
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No info found."));
        }
    }

    protected function getScoreByMGGrade($headquarter, $id) {
        $db_info = DB::table('game_user_records As gur')
                    ->join('game_users AS gu', 'gu.id', '=', 'gur.game_user_id')
                    ->join('grades AS gr', 'gr.id', '=', 'gu.grade_id')
                    ->select(DB::raw('ROUND(AVG(gur.total_score), 1) as average'), 'gr.name')
                    ->where(['gu.headquarter_id'=>$headquarter, 'gu.grade_id'=>$id])
                    ->groupBy('gr.id')
                    ->get();
        
        if (!empty($db_info[0])) {
            http_response_code(200);
            return $db_info;
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No info found."));
        }
    }

    protected function getVocationals($headquarter, $id) {
        $result = DB::table('gu_record_intelligence_ind_desc_styles AS guri')
                    ->join('game_user_records', 'guri.game_user_record_id', '=', 'game_user_records.id')
                    ->join('game_users', 'game_users.id', '=', 'game_user_records.game_user_id')
                    ->join('vocationals_orientations AS vo', 'vo.id', '=', 'guri.vocational_orientation_id')
                    // ->select(DB::raw("COUNT(styles.id) as average, 
                    //     GROUP_CONCAT(descSt.description SEPARATOR '--') AS all_desc, styles.name,
                    //     styles.description AS extra_name"))
                    ->select('vo.id', 'vo.name', 'game_users.id AS game_user', 'guri.id AS guri')
                    ->where('game_users.headquarter_id', $headquarter)
                    ->where('game_users.grade_id', $id)
                    // ->groupBy('styles.name')
                    ->get();

        $toReturn = getGlobalVocationalsInfo($result);

        if (!empty($result[0])) {
            http_response_code(200);
            return $toReturn;
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "No info found."));
        }
    }
}
