import {
  LogLevels,
  MessageKinds,
  ReactivateInactives,
  ReactivateKinds,
  ReactivateKindVariants,
} from '@/constants';
import { ReactivateKind } from '@/definitions';
import { Component, Messenger, Storage } from '@/utilities';

import { TimerOptions } from './TimerOptions';

export class ReactivateOptions extends Component {
  static async build() {
    const reactivate = await Storage.getOne('reactivate');

    const OptionsOfTimer = await TimerOptions.build();

    const GmailShieldControlOptions = document.createElement('div');
    GmailShieldControlOptions.className = 'gmail-shield-control-options';

    const GmailShieldControlOptionsTitle = document.createElement('div');
    GmailShieldControlOptionsTitle.className = 'gmail-shield-control-options-title';
    GmailShieldControlOptionsTitle.textContent = '自動再開';
    GmailShieldControlOptions.appendChild(GmailShieldControlOptionsTitle);

    ReactivateKindVariants.forEach(({ value, label }) => {
      const checked = value === reactivate.kind;

      const GmailShieldControlOptionColWrapper = document.createElement('div');
      GmailShieldControlOptionColWrapper.id = value;
      GmailShieldControlOptionColWrapper.className = `gmail-shield-control-option-col-wrapper ${checked ? '' : 'other'}`;

      const GmailShieldControlOption = document.createElement('label');
      GmailShieldControlOption.className = 'gmail-shield-control-option';

      const GmailShieldControlKindOptionInput = document.createElement('input');
      GmailShieldControlKindOptionInput.type = 'radio';
      GmailShieldControlKindOptionInput.name = 'kind';
      GmailShieldControlKindOptionInput.value = value;
      GmailShieldControlKindOptionInput.checked = checked;
      GmailShieldControlKindOptionInput.id = `${value}-kind`;
      GmailShieldControlKindOptionInput.addEventListener('change', async (e) => {
        const OtherKinds = ReactivateKindVariants.map(
          (kind) => kind.value !== value && document.getElementById(kind.value)
        ).filter((element) => !!element);

        const input = e.target as HTMLInputElement;

        if (input.checked) {
          OtherKinds.forEach((element) => {
            element.classList.add('other');
          });
          GmailShieldControlOptionColWrapper.classList.remove('other');

          const kind = input.value as ReactivateKind;

          await Storage.save({
            reactivate: {
              kind,
              inactive:
                kind === ReactivateKinds.Inactive
                  ? ReactivateInactives.On
                  : ReactivateInactives.Off,
            },
          });

          await Messenger.cast({
            kind: MessageKinds.Reactivate,
            value: kind,
            logger: {
              level: LogLevels.Info,
              value: `自動再開を"${label}"に変更しました`,
            },
          });
        }
      });

      const GmailShieldControlKindOptionText = document.createElement('span');
      GmailShieldControlKindOptionText.textContent = label;

      GmailShieldControlOption.appendChild(GmailShieldControlKindOptionInput);
      GmailShieldControlOption.appendChild(GmailShieldControlKindOptionText);
      GmailShieldControlOptionColWrapper.appendChild(GmailShieldControlOption);
      value === ReactivateKinds.Timer &&
        GmailShieldControlOptionColWrapper.appendChild(OptionsOfTimer);
      GmailShieldControlOptions.appendChild(GmailShieldControlOptionColWrapper);
    });

    return GmailShieldControlOptions;
  }
}
