import OAuthSuccessClient from "@/components/auth/OAuthSuccessClient";
import { Suspense } from "react";

export default function OAuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          Processing authentication...
        </div>
      }>
      <OAuthSuccessClient />
    </Suspense>
  );
}
