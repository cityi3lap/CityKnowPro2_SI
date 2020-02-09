<?php

use Illuminate\Database\Seeder;
use App\Performance;

class PerformancesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $info_array = ['bajo', 'medio', 'alto', 'superior'];
        $mins_array = [0, 26, 51, 76];
        $maxs_array = [25, 50, 75, 100];

        foreach ($info_array as $key => $element) {
            $new_mini_game = new Performance();
            $new_mini_game->name = $element;
            $new_mini_game->min = $mins_array[$key];
            $new_mini_game->max = $maxs_array[$key];
            $new_mini_game->save();
        }
    }
}
