import { LoggingKindVariants, LogLevels, MessageKinds } from '@/constants';
import { LoggingKind } from '@/definitions';
import { Component, Messenger, Storage } from '@/utilities';

export class LoggingOptions extends Component {
  static async build() {
    const logging = await Storage.getOne('logging');

    const GmailShieldControlOptions = document.createElement('div');
    GmailShieldControlOptions.className = 'gmail-shield-control-options';

    const GmailShieldControlOptionsTitle = document.createElement('div');
    GmailShieldControlOptionsTitle.className = 'gmail-shield-control-options-title';
    GmailShieldControlOptionsTitle.textContent = 'ロギング';
    GmailShieldControlOptions.appendChild(GmailShieldControlOptionsTitle);

    LoggingKindVariants.forEach(({ value, label }) => {
      const checked = value === logging;

      const GmailShieldControlOptionColWrapper = document.createElement('div');
      GmailShieldControlOptionColWrapper.id = value;
      GmailShieldControlOptionColWrapper.className = `gmail-shield-control-option-col-wrapper ${checked ? '' : 'other'}`;

      const GmailShieldControlOption = document.createElement('label');
      GmailShieldControlOption.className = 'gmail-shield-control-option';

      const GmailShieldControlLoggingOptionInput = document.createElement('input');
      GmailShieldControlLoggingOptionInput.type = 'radio';
      GmailShieldControlLoggingOptionInput.name = 'logging';
      GmailShieldControlLoggingOptionInput.value = value;
      GmailShieldControlLoggingOptionInput.checked = checked;
      GmailShieldControlLoggingOptionInput.id = `${value}-logging`;
      GmailShieldControlLoggingOptionInput.addEventListener('change', async (e) => {
        const OtherLoggings = LoggingKindVariants.map(
          (logging) => logging.value !== value && document.getElementById(logging.value)
        ).filter((element) => !!element);

        const input = e.target as HTMLInputElement;

        if (input.checked) {
          OtherLoggings.forEach((element) => {
            element.classList.add('other');
          });
          GmailShieldControlOptionColWrapper.classList.remove('other');

          const logging = input.value as LoggingKind;

          await Storage.save({ logging });

          await Messenger.cast({
            kind: MessageKinds.Logging,
            value: logging,
            logger: {
              level: LogLevels.Info,
              value: `ロギングを"${label}"に変更しました`,
            },
          });
        }
      });

      const GmailShieldControlLoggingOptionText = document.createElement('span');
      GmailShieldControlLoggingOptionText.textContent = label;

      GmailShieldControlOption.appendChild(GmailShieldControlLoggingOptionInput);
      GmailShieldControlOption.appendChild(GmailShieldControlLoggingOptionText);
      GmailShieldControlOptionColWrapper.appendChild(GmailShieldControlOption);
      GmailShieldControlOptions.appendChild(GmailShieldControlOptionColWrapper);
    });

    return GmailShieldControlOptions;
  }
}
