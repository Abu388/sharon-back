import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";
import ApiClient from "@/api/ApiClient";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };

    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      toast.error(validation.error.errors[0].message, {
        icon: <CircleAlert className="text-red-500" />,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await ApiClient.post("/login", formData);
      console.log("Login successful:", response.data);
      toast("Success", {
        description: "Login successful!",
      });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to log in. Please try again.", {
        icon: <CircleAlert className="text-red-500" />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-sm">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="email"
            name="email"
            className="bg-white p-5 text-black"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            className="bg-white p-5 text-black"
            placeholder="Password"
          />
        </div>
        <Button
          className="w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
