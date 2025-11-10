import { LogLevels, MessageKinds, ModeKindVariants } from '@/constants';
import { ModeKind } from '@/definitions';
import { Component, Messenger, Storage } from '@/utilities';

export class ModeOptions extends Component {
  static async build() {
    const mode = await Storage.getOne('mode');

    const GmailShieldControlOptions = document.createElement('div');
    GmailShieldControlOptions.className = 'gmail-shield-control-options';

    const GmailShieldControlOptionsTitle = document.createElement('div');
    GmailShieldControlOptionsTitle.className = 'gmail-shield-control-options-title';
    GmailShieldControlOptionsTitle.textContent = '解除方法';
    GmailShieldControlOptions.appendChild(GmailShieldControlOptionsTitle);

    ModeKindVariants.forEach(({ value, label }) => {
      const checked = value === mode.kind;

      const GmailShieldControlOptionColWrapper = document.createElement('div');
      GmailShieldControlOptionColWrapper.id = value;
      GmailShieldControlOptionColWrapper.className = `gmail-shield-control-option-col-wrapper ${checked ? '' : 'other'}`;

      const GmailShieldControlOption = document.createElement('label');
      GmailShieldControlOption.className = 'gmail-shield-control-option';

      const GmailShieldControlModeOptionInput = document.createElement('input');
      GmailShieldControlModeOptionInput.type = 'radio';
      GmailShieldControlModeOptionInput.name = 'mode';
      GmailShieldControlModeOptionInput.value = value;
      GmailShieldControlModeOptionInput.checked = checked;
      GmailShieldControlModeOptionInput.id = `${value}-mode`;
      GmailShieldControlModeOptionInput.addEventListener('change', async (e) => {
        const OtherModes = ModeKindVariants.map(
          (mode) => mode.value !== value && document.getElementById(mode.value)
        ).filter((element) => !!element);

        const input = e.target as HTMLInputElement;

        if (input.checked) {
          OtherModes.forEach((element) => {
            element.classList.add('other');
          });
          GmailShieldControlOptionColWrapper.classList.remove('other');

          const mode = input.value as ModeKind;

          await Storage.save({ mode: { kind: mode } });

          await Messenger.cast({
            kind: MessageKinds.Mode,
            value: mode,
            logger: {
              level: LogLevels.Info,
              value: `解除方法を"${label}"に変更しました`,
            },
          });
        }
      });

      const GmailShieldControlModeOptionText = document.createElement('span');
      GmailShieldControlModeOptionText.textContent = label;

      GmailShieldControlOption.appendChild(GmailShieldControlModeOptionInput);
      GmailShieldControlOption.appendChild(GmailShieldControlModeOptionText);
      GmailShieldControlOptionColWrapper.appendChild(GmailShieldControlOption);
      GmailShieldControlOptions.appendChild(GmailShieldControlOptionColWrapper);
    });

    return GmailShieldControlOptions;
  }
}
