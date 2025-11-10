import { PrimaryButton, SecondaryButton, Toast } from '@/components';
import { NotFoundElement, ValidationFailed } from '@/exceptions';
import { addErrorClass, PageComponent, Storage, submit } from '@/utilities';

import { Overlay } from '../..';
import { Password, Title } from '../../components';
import { Rules, TitleSections } from '../../constants';
import { ProtectPrivacy } from '../ProtectPrivacy';

export class ChangePassword extends PageComponent {
  static async render() {
    const NewPassword = Password.build({
      id: 'new-password',
      placeholder: '新しいパスワード',
      autocomplete: 'new-password',
    });
    const ChangePasswordButton = PrimaryButton.build({
      id: 'change-password',
      label: '変更する',
    });

    const GmailShieldContainer = document.createElement('div');
    GmailShieldContainer.className = 'gmail-shield-container';

    const GmailShieldForm = document.createElement('form');
    GmailShieldForm.className = 'gmail-shield-form';
    GmailShieldForm.addEventListener('submit', (e) => {
      submit({
        e,
        button: ChangePasswordButton,
        callback: async () => {
          const newPassword = NewPassword.querySelector('input') as HTMLInputElement;

          if (!newPassword) throw new NotFoundElement();

          const mode = await Storage.getOne('mode');

          if (!mode.value) throw new ValidationFailed();

          if (Rules.PasswordTooShort.isFailed(newPassword.value)) {
            Toast.error(Rules.PasswordTooShort.message);

            addErrorClass(newPassword);

            newPassword.value = '';

            throw new ValidationFailed();
          }

          await Storage.save({ mode: { value: newPassword.value } });

          await ProtectPrivacy.render();
        },
      });
    });

    const GmailShieldActions = document.createElement('div');
    GmailShieldActions.className = 'gmail-shield-actions';

    GmailShieldForm.appendChild(NewPassword);
    GmailShieldForm.appendChild(ChangePasswordButton);
    GmailShieldActions.appendChild(
      SecondaryButton.build({
        id: 'cancel',
        label: 'キャンセル',
        handler: () => ProtectPrivacy.render(),
      })
    );
    GmailShieldContainer.appendChild(Title.build(TitleSections.ChangePassword));
    GmailShieldContainer.appendChild(GmailShieldForm);
    GmailShieldContainer.appendChild(GmailShieldActions);

    await Overlay.replace(GmailShieldContainer);
  }
}
