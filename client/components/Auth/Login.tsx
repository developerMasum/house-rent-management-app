"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Common/Button";
import { Images } from "@/components/Common/Image";
import image1 from "../../assets/gym/8.jpeg";
import { Slide } from "react-awesome-reveal";
import Link from "next/link";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInUser } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/actions/auth.services";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    // console.log("data", data); // Logging data to console

    try {
      const res = await signInUser(data);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
      }
      router.refresh();
    } catch (err: any) {
      toast.error("Account does not exist,Please register first!!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-7xl rounded-lg overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-gray-800 flex flex-col justify-center gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email or Phone Number Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="uppercase text-sm text-zinc-200 font-bold"
              >
                Email or Phone Number
              </label>
              <input
                {...register("email", {
                  required: "Email or phone number is required",
                })}
                type="text"
                placeholder="Enter your email or phone number"
                className={`w-full h-10 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border ${
                  errors.email ? "border-red-500" : "border-zinc-400"
                } bg-transparent`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {String(errors.email.message)}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="uppercase text-sm text-zinc-200 font-bold"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Enter your password"
                className={`w-full h-10 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border ${
                  errors.password ? "border-red-500" : "border-zinc-400"
                } bg-transparent`}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {String(errors.password.message)}
                </span>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                className="px-6 w-full py-3 bg-gradient-to-r from-red-500 to-amber-500 text-zinc-200 text-sm uppercase font-semibold"
              >
                Login
              </Button>
            </div>
          </form>

          {/* Link to Register */}
          <div className="mt-4 text-center">
            <span className="text-zinc-400 text-sm">
              New here?{" "}
              <Link href="/register" className="text-amber-500 underline">
                Click here to register
              </Link>
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-auto hidden md:block">
          <Slide direction="right" className="h-full">
            <Images
              image={image1}
              alt="image1"
              className="object-cover h-full w-full"
            />
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Login;
