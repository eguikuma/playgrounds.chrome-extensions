import enabled from '@/assets/enabled-symbols/symbol.svg';
import { Component } from '@/utilities';

export class Title extends Component {
  static build() {
    const GmailShieldControlTitleWrapper = document.createElement('div');
    GmailShieldControlTitleWrapper.className = 'gmail-shield-control-title-wrapper';

    const GmailShieldControlSymbol = document.createElement('div');
    GmailShieldControlSymbol.className = 'gmail-shield-control-symbol';
    GmailShieldControlSymbol.innerHTML = enabled;

    const GmailShieldControlTitle = document.createElement('div');
    GmailShieldControlTitle.className = 'gmail-shield-control-title';
    GmailShieldControlTitle.textContent = 'Gmail Shield';

    const GmailShieldControlSubtitle = document.createElement('div');
    GmailShieldControlSubtitle.className = 'gmail-shield-control-subtitle';
    GmailShieldControlSubtitle.textContent = '拡張機能の設定を変更できます';

    GmailShieldControlTitleWrapper.appendChild(GmailShieldControlSymbol);
    GmailShieldControlTitleWrapper.appendChild(GmailShieldControlTitle);
    GmailShieldControlTitleWrapper.appendChild(GmailShieldControlSubtitle);

    return GmailShieldControlTitleWrapper;
  }
}
