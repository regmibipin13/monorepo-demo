"use client";

import { auth, getFirebaseError } from "@backend";
import { useAuth } from "@context";
import { Button } from "@ui-kit/ui";
import { FirebaseError } from "firebase/app";
import { sendEmailVerification } from "firebase/auth";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { IoReload } from "react-icons/io5";

function VerifyPage() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [remaingTime, setRemainingTime] = React.useState(0);
  const [isVerifying] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        if (user.emailVerified) {
          await user.reload();
          setVerified(true);
          setTimeout(() => {
            console.log("redirecting to dashboard");
            router.push("/dashboard");
          }, 2000);
        }
      }
      // else {
      //   router.push("/login");
      // }
    });

    console.log(params)
    // console.log("use effect called");
    // if (params.has("userId") && params.has("secret")) {
    //   handleUpdateVerification(params.get("userId")!, params.get("secret")!);
    // }
  }, [params, setUser, router]);

  function startTimer(duration: number) {
    const timeout = setInterval(function () {
      setRemainingTime(duration);
      duration--;
      if (duration < 0) {
        clearInterval(timeout);
      }
    }, 1000);
  }

  const handleSendVerification = async () => {
    try {
      setLoading(true);
      const result = await sendEmailVerification(auth.currentUser!).then(
        () => true
      );

      if (result) {
        startTimer(60);
        toast.success("Verification link sent to your email");
      } else {
        toast.error("Failed to send verification link");
      }
    } catch (error) {
      let message = "Failed to send verification link";
      if (error instanceof FirebaseError) {
        message = getFirebaseError(error, message);
      }
      toast.error(message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // const handleConfirmVerification = async () => {
  //   try {
  //     router.push("/dashboard");
  //   } catch (error) {
  //     toast.error("Email verification failed");
  //   }
  // };

  if (isVerifying) {
    //green cricular loader

    return (
      <div className="h-[100vh] flex items-center flex-col justify-center gap-10">
        <span className="text-xl font-semibold">Verifying your email!</span>
        <div className="animate-spin mx-auto rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        <span className="text-center">
          Please wait while we verify your email address!
        </span>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="flex py-7 flex-col justify-center gap-10 items-center h-[100vh]">
        <span className="text-xl font-semibold text-center">
          Verifying your email
        </span>

        <span className="text-center">
          Your email
          <span className="font-bold cursor-pointer"> {user?.email}</span> has
          been verified successfully !
        </span>
        <div className="relative w-40 h-40  md:h-96 md:w-96 ">
          <Image
            objectFit="scale-down"
            layout="fill"
            src={"assets/verification.svg"}
            alt="email_verification_art"
          />
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <span>Email verified Successfully!</span>
          <Button
            disabled={loading || remaingTime > 0}
            type="submit"
            variant="default"
            className="w-[90vw] md:w-[30vw]"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            {loading && <IoReload className="h-4 w-4 mr-2 animate-spin" />}
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex py-7 flex-col justify-center gap-10 items-center h-[100vh]">
      <span className="text-xl font-semibold text-center">
        Verify your email to continue
      </span>

      <span className="text-center">
        Check if your email{" "}
        <span className="font-bold cursor-pointer">{user?.email}</span> is
        correct
      </span>
      <div className="relative w-40 h-40  md:h-96 md:w-96 ">
        <Image
          objectFit="scale-down"
          layout="fill"
          src={"assets/verify_email.svg"}
          alt="email_verification_art"
        />
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <span
          className={`${remaingTime > 0
            ? "opacity-1 animate-in fade-in-5"
            : "opacity-0 animate-out fade-out-5"
            }`}
        >
          You can resend the verification link after{" "}
          <span className="text-primary">{remaingTime}</span> seconds
        </span>

        <Button
          disabled={loading || remaingTime > 0}
          type="submit"
          variant="default"
          className="w-[90vw] md:w-[30vw]"
          onClick={handleSendVerification}
        >
          {loading && <IoReload className="h-4 w-4 mr-2 animate-spin" />}
          Send Verification Link
        </Button>
      </div>

      <span className="text-[0.9rem] text-center self-center  text-slate-950">
        Not your email?{" "}
        <span
          className="font-semibold text-primary cursor-pointer"
          onClick={async () => {
            router.push("/login");
            await auth.signOut();
          }}
        >
          Login with another account
        </span>
      </span>
    </div>
  );
}

export default VerifyPage;
