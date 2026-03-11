import { Trans, useLingui } from '@lingui/react/macro'
import { useCredentialsForDisplay } from '@package/agent'
import { useHaptics } from '@package/app/hooks'
import {
  AnimatedStack,
  CustomIcons,
  FlexPage,
  Heading,
  HeroIcons,
  IconContainer,
  Loader,
  Paragraph,
  ScrollView,
  Stack,
  XStack,
  YStack,
} from '@package/ui'
import { useRouter } from 'expo-router'
import { InboxIcon } from './components/InboxIcon'
import { FunkeCredentialRowCard } from '@easypid/features/wallet/FunkeCredentialsScreen'

export function FunkeWalletScreen() {
  const { push } = useRouter()
  const { withHaptics } = useHaptics()

  const { credentials, isLoading: isLoadingCredentials } =
    useCredentialsForDisplay()

  const pushToMenu = withHaptics(() => push('/menu'))
  const pushToScanner = withHaptics(() => push('/scan'))
  const pushToOffline = withHaptics(() => push('/offline'))

  const { t } = useLingui()

  return (
    <YStack fg={1} bg="$background">
      <FlexPage fg={1} flex-1={false} bg="transparent">
        <XStack pt="$6"  px="$2" jc="space-between" ai="center">
          <IconContainer
            bg="white"
            aria-label="Menu"
            icon={<HeroIcons.Menu />}
            onPress={pushToMenu}
          />
          <Heading fontSize={20} fontWeight="$bold">
            ZADA
          </Heading>
          <InboxIcon />
        </XStack>
        <XStack gap="$4" jc="center"  w="95%" mx="auto">
          <YStack
            ai="center"
            jc="center"
            gap="$2"
            borderWidth={0.5}
            borderColor="$borderColor"
            borderRadius="$4"
            px="$4"
            py="$4"
            width="48%"
            onPress={pushToScanner}
          >
            <CustomIcons.Qr size={28} />

            <Paragraph ta="center">
              {t({
                id: 'home.scanQrButton',
                message: 'Scan',
              })}
            </Paragraph>
          </YStack>

          <YStack
            ai="center"
            jc="center"
            gap="$2"
            borderWidth={0.5}
            borderColor="$borderColor"
            borderRadius="$4"
            px="$4"
            py="$4"
            width="48%"
            onPress={pushToOffline}
          >
            <CustomIcons.People size={28} />

            <Paragraph ta="center">
              {t({
                id: 'home.presentInPersonButton',
                message: 'Present In-person',
              })}
            </Paragraph>
          </YStack>
        </XStack>
        <Stack h="$0.5" bg="$borderTranslucent" />
        <ScrollView>
            {isLoadingCredentials ? (
              <YStack ai="center" jc="center">
                <Loader />
              </YStack>
            ) : credentials.length > 0 ? (
              <>
                <Heading heading="h3" pb="$4" px="$2">
                  Credential List
                </Heading>

                <YStack px="$2" gap="$2">
                  {credentials.map((credential) => (
                    <FunkeCredentialRowCard
                      key={credential.id}
                      name={credential.display.name}
                      textColor={credential.display.textColor ?? '$grey-100'}
                      backgroundColor={
                        credential.display.backgroundColor ?? '$grey-900'
                      }
                      issuer={credential.display.issuer.name}
                      logo={credential.display.issuer.logo}
                      issuedAt={
                        credential.metadata.issuedAt
                          ? new Date(credential.metadata.issuedAt)
                          : undefined
                      }
                      onPress={() =>
                        push(`/credentials/${credential.id}`)
                      }
                    />
                  ))}
                </YStack>
              </>
            ) : (
              <Paragraph ta="center">
                <Trans id="credentials.emptyTitle">
                  No cards yet
                </Trans>
              </Paragraph>
            )}
          </ScrollView>
      </FlexPage>
    </YStack>
  )
}