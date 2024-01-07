"use client";

import { auth, getFirebaseError } from "@backend";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "@ui-kit/ui";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoReload } from "react-icons/io5";
import * as z from "zod";

const FormSchema = z.object({
  fullName: z.string().min(1, {
    message: "Please enter your full name",
  }),

  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const {authStatus, setAuthStatus} = useAuth();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: data.fullName,
        });
        // setAuthStatus(true);
        toast.success("Account created successfully 🎉");
        router.push("/login");
      }
    } catch (error: unknown) {
      let message = "Registration failed, try again later";

      if (error instanceof FirebaseError) {
        console.log(error.code);
        message = getFirebaseError(error, message);
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="sm:block md:flex w-full h-full ">
      <div className=" md:h-[100vh] w-full flex-1 flex justify-center items-center">
        <div className="flex-1 h-[25vh] md:h-[40vh] relative m-10">
          <Image
            alt="Register Image"
            objectFit="contain"
            fill={true}
            src={"assets/job.svg"}
          ></Image>
        </div>
      </div>
      <div className="flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full h-auto md:h-[100vh] flex-col items-center md:items-start justify-center gap-5">
              <span className="text-[1.5rem] font-bold text-primary">
                Register your account
              </span>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[90vw] md:w-[30vw]"
                        type="text"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-[90vw] md:w-[30vw]"
                        // type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
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
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[90vw] md:w-[30vw]"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading}
                type="submit"
                variant="default"
                className="w-[90vw] md:w-[30vw]"
              >
                {loading && <IoReload className="h-4 w-4 mr-2 animate-spin" />}
                Register
              </Button>
              <div className="flex w-[90vw] md:w-[30vw] justify-center mb-10 items-center gap-2">
                <span className="text-[0.9rem] text-center self-center  text-slate-950">
                  Already have an account?{" "}
                  <Link className="font-semibold text-primary" href={"/login"}>
                    {" "}
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
