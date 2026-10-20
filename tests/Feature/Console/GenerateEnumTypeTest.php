<?php

use Illuminate\Support\Facades\File;

test('enum:types generates enum.generated.ts without overwriting enum.ts', function () {
    $generatedFile = resource_path('js/types/enum.generated.ts');
    $facadeFile = resource_path('js/types/enum.ts');

    $facadeContentBefore = File::get($facadeFile);

    $this->artisan('enum:types')
        ->assertSuccessful();

    expect(File::exists($generatedFile))->toBeTrue();

    $generatedContent = File::get($generatedFile);
    expect($generatedContent)
        ->toContain('export const UserRole')
        ->toContain('export const NotificationCategory')
        ->toContain('export const NotificationTargetType');

    $facadeContentAfter = File::get($facadeFile);
    expect($facadeContentAfter)
        ->toBe($facadeContentBefore)
        ->toContain('getNotificationCategoryLabel')
        ->toContain('getUserRoleLabel');
});
