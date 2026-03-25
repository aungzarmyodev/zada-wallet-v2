import { useLingui } from '@lingui/react/macro'
import { type CredentialForDisplayId, useCredentialForDisplayById } from '@package/agent'
import {
  CredentialAttributes,
  DeleteCredentialSheet,
  FunkeCredentialCard,
  TextBackButton,
} from '@package/app/components'

import {
  useHaptics,
  useHeaderRightAction,
  useScrollViewPosition,
} from '@package/app/hooks'

import {
  FlexPage,
  HeaderContainer,
  HeroIcons,
  ScrollView,
  type ScrollViewRefType,
  useToastController,
  YStack,
} from '@package/ui'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function FunkeCredentialDetailAttributesScreen() {
  const { id } = useLocalSearchParams<{ id: CredentialForDisplayId }>()
  const { credential } = useCredentialForDisplayById(id)

  const toast = useToastController()
  const router = useRouter()

  const { handleScroll, isScrolledByOffset, scrollEventThrottle } =
    useScrollViewPosition()

  const { bottom } = useSafeAreaInsets()
  const { withHaptics } = useHaptics()

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const scrollViewRef = useRef<ScrollViewRefType>(null)
  const { t } = useLingui()
  
  // Delete credentail 
  useHeaderRightAction({
    icon: <HeroIcons.Trash color={'$color.danger-500'} />,
    onPress: withHaptics(() => setIsSheetOpen(true)),
    renderCondition: credential?.category?.canDeleteCredential ?? true,
  })

  if (!credential) {
    toast.show(
      t({
        id: 'credentials.noAttributes',
        message: 'No attributes found',
        comment: 'Error toast when a credential has no displayable attributes',
      }),
      {
        customData: { preset: 'danger' },
      }
    )
    router.back()
    return null
  }

  return (
    <YStack fg={1} bg="$background">
      <FlexPage gap="$0" paddingHorizontal="$0">
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={scrollEventThrottle}
        >
          <YStack pt="$2"  px="$2" jc="center" ai="center"> 
            <HeaderContainer
            isScrolledByOffset={isScrolledByOffset}
            title={t({
              id: 'credentials.cardAttributes',
              message: 'Credential Details',
              comment:
                'Title shown in header for the credential detail attributes screen',
            })}
          />
          </YStack>
          <YStack px="$4" gap="$4" marginBottom={bottom}>
            <FunkeCredentialCard
              issuerImage={{
                url: credential.display.issuer.logo?.url,
                altText: credential.display.issuer.logo?.altText,
              }}
              textColor={credential.display.textColor}
              name={credential.display.name}
              backgroundImage={{
                url: credential.display.backgroundImage?.url,
                altText: credential.display.backgroundImage?.altText,
              }}
              bgColor={credential.display.backgroundColor ?? '$grey-900'}
            />

            <CredentialAttributes
              key="shareable-attributes"
              headerTitle={t({
                id: 'credentials.shareableAttributes',
                message: 'Shareable attributes',
                comment:
                  'Header for attributes that can be shared with a verifier',
              })}
              attributes={credential.attributes}
              scrollRef={scrollViewRef}
            />
          </YStack>
        </ScrollView>

        <YStack
          btw="$0.5"
          borderColor="$grey-200"
          pt="$4"
          mx="$-4"
          px="$4"
          bg="$background"
        >
          <TextBackButton />
        </YStack>
      </FlexPage>
      <DeleteCredentialSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        id={credential.id}
        name={credential.display.name}
      />
    </YStack>
  )
}