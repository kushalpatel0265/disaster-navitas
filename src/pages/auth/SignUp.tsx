
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp as ClerkSignUp, useSignUp } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/auth/Logo';

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoaded } = useSignUp();
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="flex items-center justify-center flex-1 p-4">
        <Card className="w-full max-w-md shadow-lg border-gray-200 dark:border-gray-800">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>
              Fill in your details to create a new account
            </CardDescription>
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-md mt-2">
                {error}
              </div>
            )}
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex justify-center">
              <ClerkSignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "w-full shadow-none p-0 border-0",
                    header: "hidden",
                    footer: "hidden"
                  }
                }}
                redirectUrl="/dashboard"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => navigate('/sign-in')}>
                Sign in
              </Button>
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
