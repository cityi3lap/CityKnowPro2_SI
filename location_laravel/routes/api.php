<?php

use Illuminate\Http\Request;

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
Route::get('/departments/{id}', 'DepartmentController@department');
Route::get('/departmentsHeadquarters/{id}', 'DepartmentController@headquarters');

Route::get('/towns/{id}', 'TownController@town');
Route::get('/townsHeadquarters/{id}', 'TownController@headquarters');

Route::get('/institutions/{id}', 'InstitutionController@institution');
Route::get('/institutionsHeadquarters/{id}', 'InstitutionController@headquarters');

Route::get('/headquarters/{id}', 'HeadquarterController@headquarter');
Route::get('/headquarterByName/{name}', 'HeadquarterController@headquarterByName');