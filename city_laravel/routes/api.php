<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/init/{username}','GameUserController@init');
Route::get('/userInfo/{username}', 'Api\UserInfo@get');
Route::put('/saveRecords', 'Api\SaveRecords@save');

Route::post('/simat', 'Api\Simat@save');

Route::get('/trying/{id}', 'Api\UserInfo@getByRole');