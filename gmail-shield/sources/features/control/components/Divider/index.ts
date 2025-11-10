import { Component } from '@/utilities';

export class Divider extends Component {
  static build() {
    const GmailShieldControlDivider = document.createElement('div');
    GmailShieldControlDivider.className = 'gmail-shield-control-divider';

    return GmailShieldControlDivider;
  }
}
