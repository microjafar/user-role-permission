<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // $roles = ['Admin', 'Doctor', 'Staff'];
        // $modules = ['Unit'];
        // $permissions = ['Dashboard'];
        // foreach ($modules as $name) {
        //     foreach (['Read', 'Create', 'Update', 'Delete'] as $crud_value) {
        //         $permissions[] = $name . ' ' . $crud_value;
        //     }
        // }
        // foreach ($roles as $role) {
        //     Role::create([
        //         "name" => $role
        //     ]);
        // }

        // foreach ($permissions as $permission) {
        //     Permission::create([
        //         "name" => $permission
        //     ]);
        // }
    }
}
