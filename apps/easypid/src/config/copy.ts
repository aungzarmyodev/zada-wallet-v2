import { defineMessage } from '@lingui/core/macro'
import { useAssets } from 'expo-asset'
import { type AppType, CURRENT_APP_TYPE } from './appType'

export const copy = {
  FUNKE_WALLET: {
    about: {
      description: defineMessage({
        id: 'funkeWallet.about.description',
        message:
          'This app was created by Animo Solutions in the context of the SPRIN-D Funke ‘EUDI Wallet Prototypes’. It serves as a prototype for future wallet providers. All code is available under Apache 2.0.',
        comment: 'About screen description text for the Funke wallet',
      }),
      emailHeader: defineMessage({
        id: 'funkeWallet.about.emailHeader',
        message: 'Reach out from Funke EUDI Wallet',
        comment: 'Email subject when contacting support from Funke wallet',
      }),
    },
  },
  PARADYM_WALLET: {
    about: {
      description: defineMessage({
        id: 'paradymWallet.about.description',
        message:
          'ZADA is a Digital Identity Technology Company, driven to ensure everyone can provide and use digital services without risk for fraud or privacy intrusion.\n\nUsing ZADA, you are in full control of your data. You decide what you want to receive and what you want to share with who.\n\nZADA is leading a revolution in how personal information is managed, and by using ZADA you are part of this change!\n\nTo contribute back to the community, the ZADA App is created as an open source project, originally created by Trustnet Pakistan, so other companies that want to launch a wallet on ZADA Network also can do that.\n\nZADA is not just an app but an ecosystem, a network, and a mission to ensure everyone can provide and use digital services without risk for fraud or privacy intrusion!',
        comment: 'About screen description text for the Paradym wallet',
      }),
      emailHeader: defineMessage({
        id: 'paradymWallet.about.emailHeader',
        message: 'Reach out from Paradym Wallet',
        comment: 'Email subject when contacting support from Paradym wallet',
      }),
    },
  },
} satisfies Record<AppType, Record<string, unknown>>

export function useAppCopy() {
  return copy[CURRENT_APP_TYPE]
}

export function useAppIcon() {
  const [assets] = useAssets([require('../../assets/funke/icon.png'), require('../../assets/paradym/icon.png')])
  if (CURRENT_APP_TYPE === 'FUNKE_WALLET') {
    return assets?.[0]
  }
  return assets?.[1]
}
