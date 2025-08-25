
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const supabase = createClient();
    
    // Step 1: Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) {
      setError(authError.message || "An error occurred during signup. Please try again.");
      setPending(false);
      return;
    }

    if (!authData.user) {
        setError("User could not be created. Please try again.");
        setPending(false);
        return;
    }

    // Step 2: Create a profile for the new user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: fullName,
        email: email,
        updated_at: new Date().toISOString()
      });
    
    if (profileError) {
        // If profile creation fails, you might want to delete the user
        // or have a cleanup process, but for now, we'll show an error.
        setError("User signed up, but profile creation failed. Please contact support.");
        console.error("Profile creation error: ", profileError);
        setPending(false);
        return;
    }

    // If both succeed, refresh the session and redirect
    await supabase.auth.signInWithPassword({ email, password });
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-sm bg-secondary/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input
                id="full-name"
                name="name"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-primary">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
