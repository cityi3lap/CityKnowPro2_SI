<?php

use Illuminate\Database\Seeder;
use App\SubjectMiniGame;

class SubjectMiniGamesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subjects_id_array = [3, 3, 3, 1, 1, 1, 2, 2, 2, null, 3, 3, 3, 1, 1, 1, 2, 2, 2, null, 3, 3, 3,
                            1, 1, 2, 2, 2, null, 3, 3, 3, 1, 1, 1, 2, 2, null, 1, 3, 3, 3, 1, 1, 2, 2,
                            null, 3, 3, 1, 1, 2, 2, null, 1, 3, 2, 4, 3, 3, 1, 1, 2, 2, null, 3, 3, 1, 1,
                            2, 2, null, 3, 3, 1, 1, 2, 2, null, 3, 3, 1, 1, 2, 2, null, 1, 3, 2, 4, 1, 3,
                            1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2,
                            6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5,
                            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
        
        for ($i=1; $i <= 204 ; $i++) { 
            $index = $i - 1;
            if (isset($subjects_id_array[$index]) && $subjects_id_array[$index] != null) {
                $new_subject_mini_game = new SubjectMiniGame();
                $new_subject_mini_game->mini_game_id = $i;
                $new_subject_mini_game->subject_id = $subjects_id_array[$index];
                $new_subject_mini_game->dba = 'dba-'.$i;
                $new_subject_mini_game->save();
            }
        }
    }
}
