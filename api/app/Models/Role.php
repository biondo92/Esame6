<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "roles";
    protected $primaryKey = "id";

    protected $fillable = [
        "description"
    ];

    public $description;

    public function users()
    {
        return $this->hasMany(User::class, 'roleId', 'id');
    }
}
