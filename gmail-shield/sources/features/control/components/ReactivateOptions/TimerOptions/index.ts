import { LogLevels, MessageKinds, ReactivateKinds, ReactivateTimerVariants } from '@/constants';
import { ReactivateTimer } from '@/definitions';
import { Component, Messenger, Storage } from '@/utilities';

export class TimerOptions extends Component {
  static async build() {
    const reactivate = await Storage.getOne('reactivate');
    const checked = reactivate.kind === ReactivateKinds.Timer;

    const GmailShieldControlOptions = document.createElement('div');
    GmailShieldControlOptions.className = `gmail-shield-control-options ${checked ? '' : 'disabled'}`;

    ReactivateTimerVariants.forEach(({ value, label }) => {
      const checked = value === reactivate.timer;

      const GmailShieldControlOptionColWrapper = document.createElement('div');
      GmailShieldControlOptionColWrapper.id = String(value);
      GmailShieldControlOptionColWrapper.className = `gmail-shield-control-option-col-wrapper ${checked ? '' : 'other'}`;

      const GmailShieldControlOption = document.createElement('label');
      GmailShieldControlOption.className = 'gmail-shield-control-option secondary';

      const GmailShieldControlTimerOptionInput = document.createElement('input');
      GmailShieldControlTimerOptionInput.type = 'radio';
      GmailShieldControlTimerOptionInput.name = 'timer';
      GmailShieldControlTimerOptionInput.value = String(value);
      GmailShieldControlTimerOptionInput.checked = value === reactivate.timer;
      GmailShieldControlTimerOptionInput.id = `${value}-timer`;
      GmailShieldControlTimerOptionInput.addEventListener('change', async (e) => {
        const OtherTimers = ReactivateTimerVariants.map(
          (timer) => timer.value !== value && document.getElementById(String(timer.value))
        ).filter((element) => !!element);

        const input = e.target as HTMLInputElement;

        if (input.checked) {
          OtherTimers.forEach((element) => {
            element.classList.add('other');
          });
          GmailShieldControlOptionColWrapper.classList.remove('other');

          const timer = Number(input.value) as ReactivateTimer;

          await Storage.save({ reactivate: { timer } });

          await Messenger.cast({
            kind: MessageKinds.Reactivate,
            value: timer,
            logger: {
              level: LogLevels.Info,
              value: `タイマーを"${label}"に変更しました`,
            },
          });
        }
      });

      const GmailShieldControlTimerOptionText = document.createElement('span');
      GmailShieldControlTimerOptionText.textContent = label;

      GmailShieldControlOption.appendChild(GmailShieldControlTimerOptionInput);
      GmailShieldControlOption.appendChild(GmailShieldControlTimerOptionText);
      GmailShieldControlOptionColWrapper.appendChild(GmailShieldControlOption);
      GmailShieldControlOptions.appendChild(GmailShieldControlOptionColWrapper);
    });

    return GmailShieldControlOptions;
  }
}
