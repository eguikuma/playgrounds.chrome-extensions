import { Component } from '@/utilities';

export class PrimaryButton extends Component {
  static build({
    id,
    label,
    type = 'submit',
    handler,
  }: {
    id: string;
    label: string;
    type?: HTMLButtonElement['type'];
    handler?: (e: MouseEvent) => Promise<void> | void;
  }) {
    const GmailShieldButton = document.createElement('button');
    GmailShieldButton.className = 'gmail-shield-button';
    GmailShieldButton.id = id;
    GmailShieldButton.type = type;
    GmailShieldButton.textContent = label;

    handler && GmailShieldButton.addEventListener('click', handler);

    return GmailShieldButton;
  }
}
