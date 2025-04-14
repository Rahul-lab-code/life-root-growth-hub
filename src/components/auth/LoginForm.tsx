
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Leaf, Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
    } catch (error) {
      // Error is handled in the AuthContext
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-soft">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-liferoot-green p-3 rounded-full mb-4">
          <Leaf className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-center">
          Welcome to Life<span className="text-liferoot-blue">Root</span>
        </h1>
        <p className="text-muted-foreground text-sm text-center mt-1">
          Sign in to access your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">Demo accounts:</p>
        <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-muted-foreground">
          <div className="p-2 bg-muted rounded">
            <p className="font-medium">Admin</p>
            <p>admin@liferoot.com</p>
            <p>admin123</p>
          </div>
          <div className="p-2 bg-muted rounded">
            <p className="font-medium">Mentor</p>
            <p>mentor@liferoot.com</p>
            <p>mentor123</p>
          </div>
          <div className="p-2 bg-muted rounded">
            <p className="font-medium">Student</p>
            <p>student@liferoot.com</p>
            <p>student123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
