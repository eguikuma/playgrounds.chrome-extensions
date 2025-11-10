import enabled from '@/assets/enabled-symbols/symbol.svg';
import { TitleSection } from '@/definitions';
import { Component } from '@/utilities';

export class Title extends Component {
  static build(section: TitleSection) {
    const GmailShieldTitleWrapper = document.createElement('div');
    GmailShieldTitleWrapper.className = 'gmail-shield-title-wrapper';

    const GmailShieldSymbol = document.createElement('div');
    GmailShieldSymbol.className = 'gmail-shield-symbol';
    GmailShieldSymbol.innerHTML = enabled;

    const GmailShieldMessageWrapper = document.createElement('div');
    GmailShieldMessageWrapper.className = 'gmail-shield-message-wrapper';

    const GmailShieldPrimaryMessage = document.createElement('div');
    GmailShieldPrimaryMessage.className = 'gmail-shield-primary-message';
    GmailShieldPrimaryMessage.textContent = section.primary;

    const GmailShieldSecondaryMessage = document.createElement('div');
    GmailShieldSecondaryMessage.className = 'gmail-shield-secondary-message';
    GmailShieldSecondaryMessage.textContent = section.secondary;

    GmailShieldTitleWrapper.appendChild(GmailShieldSymbol);
    GmailShieldMessageWrapper.appendChild(GmailShieldPrimaryMessage);
    GmailShieldMessageWrapper.appendChild(GmailShieldSecondaryMessage);
    GmailShieldTitleWrapper.appendChild(GmailShieldMessageWrapper);

    return GmailShieldTitleWrapper;
  }
}
