import { PrimaryButton, SecondaryButton, Toast } from '@/components';
import { ModeKinds } from '@/constants';
import { NotFoundElement, ValidationFailed } from '@/exceptions';
import { addErrorClass, PageComponent, Storage, submit } from '@/utilities';

import { Overlay } from '../..';
import { Password, Title } from '../../components';
import { Rules, TitleSections } from '../../constants';
import { ChangePassword } from '../ChangePassword';

export class ProtectPrivacy extends PageComponent {
  static async render() {
    const mode = await Storage.getOne('mode');

    if (mode.kind === ModeKinds.Click) {
      await this.forClick();
    } else {
      await this.forPassword();
    }
  }

  private static async forClick() {
    const GmailShieldContainer = document.createElement('div');
    GmailShieldContainer.className = 'gmail-shield-container height-auto';

    GmailShieldContainer.appendChild(Title.build(TitleSections.ProtectPrivacy));
    GmailShieldContainer.appendChild(
      PrimaryButton.build({
        id: 'clear-overlay',
        label: '閉じる',
        handler: () => Overlay.close(),
      })
    );

    await Overlay.replace(GmailShieldContainer);
  }

  private static async forPassword() {
    const InputPassword = Password.build({
      id: 'input-password',
      placeholder: 'パスワード',
      autocomplete: 'current-password',
    });
    const ClearOverlayButton = PrimaryButton.build({
      id: 'clear-overlay',
      label: '閉じる',
    });

    const GmailShieldContainer = document.createElement('div');
    GmailShieldContainer.className = 'gmail-shield-container';

    const GmailShieldForm = document.createElement('form');
    GmailShieldForm.className = 'gmail-shield-form';
    GmailShieldForm.addEventListener('submit', (e) => {
      submit({
        e,
        button: ClearOverlayButton,
        callback: async () => {
          const input = InputPassword.querySelector('input') as HTMLInputElement;

          if (!input) throw new NotFoundElement();

          const mode = await Storage.getOne('mode');

          if (!mode.value) throw new ValidationFailed();

          if (Rules.PasswordInvalid.isFailed(input.value, mode.value)) {
            Toast.error(Rules.PasswordInvalid.message);

            addErrorClass(input);

            input.value = '';

            throw new ValidationFailed();
          }

          Overlay.close();
        },
      });
    });

    const GmailShieldActions = document.createElement('div');
    GmailShieldActions.className = 'gmail-shield-actions';

    GmailShieldForm.appendChild(InputPassword);
    GmailShieldForm.appendChild(ClearOverlayButton);
    GmailShieldActions.appendChild(
      SecondaryButton.build({
        id: 'change-password',
        label: 'パスワードを変更',
        handler: () => ChangePassword.render(),
      })
    );
    GmailShieldContainer.appendChild(Title.build(TitleSections.ProtectPrivacy));
    GmailShieldContainer.appendChild(GmailShieldForm);
    GmailShieldContainer.appendChild(GmailShieldActions);

    await Overlay.replace(GmailShieldContainer);
  }
}
