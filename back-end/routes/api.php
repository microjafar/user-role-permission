<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use App\Models\Permission;
use App\Models\User;
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

Route::middleware('auth:sanctum')->get('auth', function (Request $request) {
    $permissions = [];
    $user = User::with(['roles.permissions', 'permissions', 'units'])->find($request->user()->id);
    $user_roles = $user->roles;

    // get permissions from user -> roles -> permissions
    foreach ($user_roles as $role) {
        $permissions = array_merge($permissions, $role->permissions->pluck('name')->toArray());
    }
    // get permission from user
    $permissions = array_merge($permissions, $user->permissions->pluck('name')->toArray());

    // get permission from units
    foreach ($user->units as $unit) {
        // $permissions[] = {Unit Name} - {Unit Id}
        $permissions[] = $unit->name . ' - ' . $unit->id;
    }
    $user = $request->user();
    $user->load('units');
    $user->permissions = $permissions;
    $user->roles = $user_roles;
    return $user;
});

Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::apiResource('role', RoleController::class);
Route::apiResource('permission', PermissionController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('unit', UnitController::class);
    Route::apiResource('user', UserController::class);
});
