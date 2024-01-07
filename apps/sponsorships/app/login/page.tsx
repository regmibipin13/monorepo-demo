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
  FormMessage, Input
} from "@ui-kit/ui";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoReload } from "react-icons/io5";
import * as z from "zod";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [faceBookLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (userCredential.user) {
        router.replace("/dashboard");
        toast.success("Login Success");
      }
    } catch (error) {
      let msg = "Login failed,try again later";

      if (error instanceof FirebaseError) {
        msg = getFirebaseError(error, msg);
      }
      toast.error(msg);
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

  const onLoginwithGoogle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      e.preventDefault();
      setGoogleLoading(true);
      // const googleUser = await
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      if (userCredential.user) {
        router.replace("/dashboard");

        toast.success("Login Success");
      }
    } catch (error) {
      toast.error("Login with google failed,try again later");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="sm:block md:flex w-full h-full ">
      <div className=" md:h-[100vh] w-full flex-1 flex justify-center items-center">
        <div className="flex-1 h-[25vh] md:h-[40vh] relative m-10">
          <Image
            alt="Login Image"
            objectFit="contain"
            fill={true}
            src={"assets/job.svg"}
          ></Image>
        </div>
      </div>
      <div className="flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full mb-10 h-auto md:h-[100vh] flex-col items-center md:items-start justify-center gap-5">
              <span className="text-[1.5rem] font-bold text-primary">
                Welcome to Inline Hiring
              </span>

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
                        type="email"
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
                Login
              </Button>
              <div className="flex w-[90vw] md:w-[30vw] justify-center items-center gap-2">
                <span className="text-[0.9rem] text-center self-center  text-slate-950">
                  Don&#39;t have an account?{" "}
                  <Link
                    className="font-semibold text-primary"
                    href={"/register"}
                  >
                    {" "}
                    Sign up
                  </Link>
                </span>
              </div>
              <Button
                disabled={loading}
                onClick={onLoginwithGoogle}
                type="button"
                variant="outline"
                className="w-[90vw] md:w-[30vw]"
              >
                {googleLoading ? (
                  <IoReload className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FcGoogle className="h-6 w-6 mr-5" />
                )}
                Continue with Google
              </Button>
              <Button
                disabled={loading}
                type="button"
                variant="outline"
                className="w-[90vw] md:w-[30vw]"
                onClick={() => { }}
              >
                {faceBookLoading ? (
                  <IoReload className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FaFacebook className="h-6 w-6 mr-4 text-[#316FF6]" />
                )}
                Continue with Facebook
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
