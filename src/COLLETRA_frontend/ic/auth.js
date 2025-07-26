import { AuthClient } from "@dfinity/auth-client";

export async function loginWithII() {
  const authClient = await AuthClient.create();
  await authClient.login({
    identityProvider: "https://identity.ic0.app",
    onSuccess: () => window.location.reload(),
  });
  return authClient;
}

export async function getPrincipal(authClient) {
  return authClient.getIdentity().getPrincipal().toText();
}