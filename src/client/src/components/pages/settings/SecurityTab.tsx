import { PasswordSection } from './PasswordSection';
import { SecuritySettingsSection } from './SecuritySettingsSection';

export function SecurityTab() {
  return (
    <div className="space-y-6">
      <PasswordSection
        passwords={{
          current: '123123',
          new: '123123',
          confirm: '12312',
        }}
        onPasswordsChange={() => {}}
        onPasswordChange={() => {}}
      />

      <SecuritySettingsSection />

      {/* <DangerZoneSection onDeleteAccount={onDeleteAccount} /> */}
    </div>
  );
}
