import { ILocalization } from '../models';

/**
 * @public @constant
 * List of localization records thas is used in localization selection
 */
export const SUPPORTED_LOCALIZATIONS_LIST: ILocalization[] = [
  {
    disabled: false,
    globalName: 'German',
    signature: 'de-DE',
    value: 'Deutsch',
    visible: true,
  },
  {
    disabled: false,
    globalName: 'english',
    signature: 'en-US',
    value: 'English',
    visible: true,
  },
  {
    disabled: false,
    globalName: 'slovenian',
    signature: 'sl-SI',
    value: 'Slovenščina',
    visible: true,
  },
];

export const ResolveStoredLocalization = (
  storageKey: string
): string | null => {
  if (window?.localStorage) {
    const storedLocalization = window?.localStorage.getItem('LOCALIZATION');
    return storedLocalization;
  }

  return 'sl-SI';
};
