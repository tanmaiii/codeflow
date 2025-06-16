import { DangerZoneSection } from './DangerZoneSection';
import { SecuritySettingsSection } from './SecuritySettingsSection';

export function SecurityTab() {
  const onDeleteAccount = () => {
    console.log('delete account');
  };

  return (
    <div className="space-y-6">
      {/* <PasswordSection 
        passwords={passwords}
        onPasswordsChange={onPasswordsChange}
        onPasswordChange={onPasswordChange}
      /> */}

      <SecuritySettingsSection />

      <DangerZoneSection onDeleteAccount={onDeleteAccount} />
    </div>
  );
}
