import { Trans, useLingui } from '@lingui/react/macro'
import { useCredentialsForDisplay } from '@package/agent'
import { useHaptics } from '@package/app/hooks'
import {
  CustomIcons,
  FlexPage,
  Heading,
  HeroIcons,
  IconContainer,
  Loader,
  Paragraph,
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

  const { t } = useLingui()

  return (
    <YStack fg={1} bg="$background">
      <FlexPage fg={1} flex-1={false} bg="transparent">
        <XStack pt="$6" px="$2" jc="space-between" ai="center">
          <IconContainer
            bg="white"
            aria-label="Menu"
            icon={<HeroIcons.Menu />}
            onPress={pushToMenu}
          />
          <Heading fontSize={20} fontWeight="$bold" color={'$primary-500'}>
            ZADA
          </Heading>
          <InboxIcon />
        </XStack>
        {isLoadingCredentials ? (
          <YStack ai="center" jc="center" mt="$6">
            <Loader />
          </YStack>
        ) : credentials.length > 0 ? (
          <>
            <Heading heading="h3" px="$2">
              Credential List
            </Heading>
            <YStack px="$2" gap="$2" pb="$12">
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
                  onPress={() => push(`/credentials/${credential.id}/attributes`)}
                />
              ))}
            </YStack>
          </>
        ) : (
          <Paragraph ta="center" mt="$6">
            <Trans id="credentials.emptyTitle">
              There's nothing here, yet
            </Trans>
          </Paragraph>
        )}
      </FlexPage>
      <XStack
        position="absolute"
        bottom="$10"
        left={0}
        right={0}
        jc="center">
        <XStack
          ai="center"
          gap="$2"
          px="$5"
          py="$3"
          br="$10"
          bg="$primary-500"
          onPress={pushToScanner}
          pressStyle={{ opacity: 0.8 }}
          shadowColor="$shadowColor"
          shadowRadius={10}>
          <CustomIcons.Qr size={28} color={'$white'} />
          <Paragraph color="$white" fontWeight="$bold">
            Scan
          </Paragraph>
        </XStack>
      </XStack>
    </YStack>
  )
}