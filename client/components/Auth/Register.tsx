"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Common/Button";
import { Images } from "@/components/Common/Image";
import image1 from "../../assets/gym/8.jpeg";
import { Slide, Zoom } from "react-awesome-reveal";
import Link from "next/link";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createUser] = useCreateUserMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    // console.log("data", data); // Logging data to console
    try {
      const res = await createUser(data).unwrap();
      if (res?.data) {
        toast.success("Account created successfully");
        await logoutUser(router);
        router.push("/login");
      }
    } catch (err: any) {
      toast(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-lg overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 h-auto hidden md:block">
          <Zoom className="h-full">
            <Images
              image={image1}
              alt="image1"
              className="object-cover h-full w-full"
            />
          </Zoom>
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-gray-800 flex flex-col justify-center gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="uppercase text-sm text-zinc-200 font-bold"
              >
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className={`w-full h-10 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border ${
                  errors.name ? "border-red-500" : "border-zinc-400"
                } bg-transparent`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {String(errors.name.message)}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="uppercase text-sm text-zinc-200 font-bold"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
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

            {/* Phone Number Input */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="uppercase text-sm text-zinc-200 font-bold"
              >
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Enter your phone number"
                className={`w-full h-10 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border ${
                  errors.phone ? "border-red-500" : "border-zinc-400"
                } bg-transparent`}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {String(errors.phone.message)}
                </span>
              )}
            </div>

            {/* Age Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="age"
                className="uppercase text-sm text-zinc-200 font-bold"
              >
                Age
              </label>
              <input
                {...register("age", {
                  required: "Age is required",
                  min: { value: 1, message: "Please enter a valid age" },
                  max: { value: 120, message: "Please enter a realistic age" },
                })}
                type="number"
                placeholder="Enter your age"
                className={`w-full h-10 pl-4 pr-8 text-zinc-400 outline-none transition-all  duration-200 focus:border-amber-500 border ${
                  errors.age ? "border-red-500" : "border-zinc-400"
                } bg-transparent`}
              />
              {errors.age && (
                <span className="text-red-500 text-sm">
                  {String(errors.age.message)}
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
                {...register("password")}
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
                Register
              </Button>
            </div>
          </form>
          <div className=" text-center">
            <p className="text-zinc-400 text-sm">
              New here?
              <Link href="/login" className="text-amber-500 underline">
                <span className="ml-1"> Click here to login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
