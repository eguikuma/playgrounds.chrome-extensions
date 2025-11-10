import { Component } from '@/utilities';

export class Container extends Component {
  static build() {
    const GmailShieldControlContainer = document.createElement('div');
    GmailShieldControlContainer.className = 'gmail-shield-control-container';

    return GmailShieldControlContainer;
  }
}
