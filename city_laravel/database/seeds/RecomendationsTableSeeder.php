<?php

use Illuminate\Database\Seeder;
use App\Recomendation;

class RecomendationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($p=1; $p <= 4; $p++) { // 1-4 performances
            for ($s=1; $s <= 6; $s++) { // 1-6 subjects
                if ($s !== 4) { // 4 competencias ciudadanas is not in consideration
                    for ($h=1; $h <= 6 ; $h++) { // 1-6 subjects
                        for ($g=0; $g <= 9 ; $g++) { // 0-9 grades
                            $new_row = new Recomendation();
                            $new_row->performance_id = $p;
                            $new_row->subject_id = $s;
                            $new_row->hierarchy_id = $h;
                            $new_row->grade_id = $g;
                            $new_row->recomendation = 'recomendation for '.$p.'-'.$s.'-'.$h.'-'.$g;
                            $new_row->save();
                        }
                    }
                }
            }
        }
    }
}
