<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesAvatar;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class UpdateProfileRequest extends FormRequest
{
    use ValidatesAvatar;

    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date', 'before_or_equal:'.now('Asia/Jakarta')->subYears(18)->toDateString()],
            'user_id' => ['prohibited'],
            'role' => ['prohibited'],
            'email' => ['prohibited'],
            'password' => ['prohibited'],
            'avatar' => $this->avatarFileRules(),
            'remove_avatar' => ['nullable', 'boolean'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($this->hasFile('avatar') && $this->boolean('remove_avatar')) {
                    $validator->errors()->add('remove_avatar', 'Foto baru dan penghapusan foto tidak dapat dikirim bersamaan.');
                }
            },
        ];
    }
}
