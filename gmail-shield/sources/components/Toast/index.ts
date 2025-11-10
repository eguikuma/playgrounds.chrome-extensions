export class Toast {
  static error(message: string, duration = 3000) {
    const GmailShieldToast = document.createElement('div');
    GmailShieldToast.className = 'gmail-shield-toast';
    GmailShieldToast.textContent = message;
    document.body.appendChild(GmailShieldToast);

    setTimeout(() => {
      GmailShieldToast.remove();
    }, duration);
  }
}
