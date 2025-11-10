import { LogLevels, MessageKinds } from '@/constants';
import { Component } from '@/utilities';
import { Messenger, Storage } from '@/utilities';

export class StateToggle extends Component {
  static async build() {
    const GmailShieldControlToggleWrapper = document.createElement('label');
    GmailShieldControlToggleWrapper.className = 'gmail-shield-control-toggle-wrapper';

    const GmailShieldControlToggle = document.createElement('div');
    GmailShieldControlToggle.className = 'gmail-shield-control-toggle';

    const GmailShieldControlToggleInput = document.createElement('input');
    GmailShieldControlToggleInput.type = 'checkbox';
    GmailShieldControlToggleInput.id = 'gmail-shield-control-toggle-input';
    GmailShieldControlToggleInput.checked = await Storage.getOne('enabled');
    GmailShieldControlToggleInput.addEventListener('change', async (e) => {
      const enabled = (e.target as HTMLInputElement).checked;

      await Storage.save({ enabled });

      await Messenger.cast({
        kind: MessageKinds.State,
        value: enabled,
        logger: {
          level: LogLevels.Info,
          value: `プライバシー保護を"${enabled ? '有効' : '無効'}"にしました`,
        },
      });
    });

    const GmailShieldControlToggleSlider = document.createElement('span');
    GmailShieldControlToggleSlider.className = 'gmail-shield-control-toggle-slider';

    GmailShieldControlToggle.appendChild(GmailShieldControlToggleInput);
    GmailShieldControlToggle.appendChild(GmailShieldControlToggleSlider);
    GmailShieldControlToggleWrapper.appendChild(GmailShieldControlToggle);

    return GmailShieldControlToggleWrapper;
  }
}
